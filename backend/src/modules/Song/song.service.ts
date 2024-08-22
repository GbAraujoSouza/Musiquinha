import { Prisma, Song, User } from "@prisma/client";
import { EStatusErrors } from "../../enum/status-errors.enum";
import prisma from "../../prismaConnection";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

interface SongWithPublicUrl extends Song {
  songPublicUrl: string;
}

interface SongSearchFilters {
  title?: string;
  artistName?: string;
  albumTitle?: string;
}

export class SongService {
  private static bucketName = process.env.BUCKET_NAME;
  private static bucketRegion = process.env.BUCKET_REGION;

  private static s3 = new S3Client({ region: this.bucketRegion });

  private static randomSongName = (bytes: number = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  private static async appendPublicSongUrl(songs: Song[]) {
    const songsWithPublicUrls: SongWithPublicUrl[] = [];

    for (const song of songs) {
      const getObjectParams = {
        Bucket: this.bucketName,
        Key: song.url,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

      songsWithPublicUrls.push({
        ...song,
        songPublicUrl: url,
      });
    }
    return songsWithPublicUrls;
  }

  public static async create(
    title: string,
    file: Express.Multer.File,
    artistId: string,
  ) {
    const songName = this.randomSongName();

    const params = {
      Bucket: this.bucketName,
      Key: songName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await this.s3.send(command);

    const songInput: Prisma.SongCreateInput = {
      title,
      url: songName,
      artist: {
        connect: {
          id: artistId,
        },
      },
      album: undefined,
    };

    const createdSong = await prisma.song.create({
      data: songInput,
    });

    return createdSong;
  }

  public static async index(): Promise<SongWithPublicUrl[]> {
    const findSongs = await prisma.song.findMany();

    if (!findSongs) throw new Error(EStatusErrors.E404);

    const songsWithPublicUrls: SongWithPublicUrl[] = [];

    for (const song of findSongs) {
      const getObjectParams = {
        Bucket: this.bucketName,
        Key: song.url,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

      songsWithPublicUrls.push({
        ...song,
        songPublicUrl: url,
      });
    }
    return songsWithPublicUrls;
  }

  public static async searchSongs(filters: SongSearchFilters) {
    const songs = await prisma.song.findMany({
      where: {
        title: {
          contains: filters.title,
          mode: "insensitive",
        },
        artist: {
          name: {
            contains: filters.artistName,
            mode: "insensitive",
          },
        },
      },
      include: {
        artist: {
          select: {
            name: true,
          },
        },
        album: true,
      },
    });

    const songsWithUrl = await this.appendPublicSongUrl(songs);

    return songsWithUrl;
  }

  public static async show(songId: string) {
    const findMusic = await prisma.song.findUnique({
      where: { id: songId },
    });

    if (!findMusic) throw new Error(EStatusErrors.E404);

    const songUrl = `${process.env.APP_URL}/uploads/${findMusic.url}`;

    return { ...findMusic, songUrl };
  }

  public static async getFavorites(
    userId: string,
  ): Promise<SongWithPublicUrl[] | void> {
    const findUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!findUser) throw new Error(EStatusErrors.E404);

    const likedSongs = await prisma.favorites.findUnique({
      where: { userId: userId },
      include: {
        songs: {
          include: {
            artist: true,
          },
        },
      },
    });

    if (likedSongs) {
      const likedSongsWithUrl = await this.appendPublicSongUrl(
        likedSongs.songs,
      );
      return likedSongsWithUrl;
    }
  }

  public static async favoriteSong(songId: string, userId: string) {
    const song = await prisma.song.findUnique({
      where: { id: songId },
    });
    if (!song) throw new Error(EStatusErrors.E404);

    const user = await prisma.song.findUnique({
      where: { id: songId },
    });
    if (!user) throw new Error(EStatusErrors.E404);

    const found = await prisma.favorites.findUnique({
      where: {
        userId,
      },
      include: {
        songs: {
          where: { id: songId },
        },
      },
    });

    if (found?.songs.length) throw new Error(EStatusErrors.E401);

    const updateFavoriteInput: Prisma.FavoritesUpdateInput = {
      songs: {
        connect: { id: songId },
      },
    };

    await prisma.favorites.update({
      where: {
        userId: userId,
      },
      data: updateFavoriteInput,
    });

    await prisma.song.update({
      where: { id: songId },
      data: { likes: { increment: 1 } },
    });
  }

  public static async unfavoriteSong(songId: string, userId: string) {
    const song = await prisma.song.findUnique({
      where: { id: songId },
    });
    if (!song) throw new Error(EStatusErrors.E404);

    const user = await prisma.song.findUnique({
      where: { id: songId },
    });
    if (!user) throw new Error(EStatusErrors.E404);

    const updateFavoriteInput: Prisma.FavoritesUpdateInput = {
      songs: {
        disconnect: { id: songId },
      },
    };

    await prisma.favorites.update({
      where: {
        userId: userId,
      },
      data: updateFavoriteInput,
    });
    if (song.likes > 0) {
      await prisma.song.update({
        where: { id: songId },
        data: { likes: { decrement: 1 } },
      });
    }
  }

  public static async getSongsOrderedByLikes(limit: number) {
    const songs = await prisma.song.findMany({
      orderBy: {
        favorites: {
          _count: "desc",
        },
      },
      take: limit,
      skip: 0,
      include: {
        artist: {
          select: {
            name: true,
          },
        },
        album: true,
      },
    });

    const songsWithUrl = await this.appendPublicSongUrl(songs);

    return songsWithUrl;
  }
}
