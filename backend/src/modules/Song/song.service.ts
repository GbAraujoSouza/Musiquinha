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
};

export class SongService {
  private static bucketName = process.env.BUCKET_NAME;
  private static bucketRegion = process.env.BUCKET_REGION;

  private static s3 = new S3Client({ region: this.bucketRegion });

  private static randomSongName = (bytes: number = 32) =>
    crypto.randomBytes(bytes).toString("hex");

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
      }
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

      songsWithPublicUrls.push({
        ...song,
        songPublicUrl: url,
      })
    }
    return songsWithPublicUrls;
  }

  public static async show(songId: string) {
    const findMusic = await prisma.song.findUnique({
      where: { id: songId },
    });

    if (!findMusic) throw new Error(EStatusErrors.E404);

    const songUrl = `${process.env.APP_URL}/uploads/${findMusic.url}`;

    return { ...findMusic, songUrl };
  }

  public static async getFavorites(userId: string) {
    const findUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!findUser) throw new Error(EStatusErrors.E404);

    const likedSongs = await prisma.favorites.findUnique({
      where: { userId: userId },
      include: { songs: true },
    });

    return likedSongs;
  }

  public static async favoriteSong(songId: string, userId: string) {
    const song = await prisma.song.findUnique({
      where: { id: songId },
    });
    if (!song) throw new Error(EStatusErrors.E404);

    const updatedFavorites = await prisma.favorites.update({
      where: {
        userId: userId,
      },
      data: {
        songs: { connect: { id: songId } },
      },
    });
  }
}
