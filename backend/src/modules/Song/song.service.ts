import { Prisma, User } from "@prisma/client";
import { EStatusErrors } from "../../enum/status-errors.enum";
import prisma from "../../prismaConnection";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

export class SongService {
  private static bucketName = process.env.BUCKET_NAME;
  private static bucketRegion = process.env.BUCKET_REGION;

  private static randomSongName = (bytes: number = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  public static async create(
    title: string,
    file: Express.Multer.File,
    artistId: string,
  ) {
    console.log(artistId);
    const s3 = new S3Client({ region: this.bucketRegion });

    const songName = this.randomSongName();

    const params = {
      Bucket: this.bucketName,
      Key: songName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

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
  public static async index() {
    const findMusics = await prisma.song.findMany();

    if (!findMusics) throw new Error(EStatusErrors.E404);

    return findMusics;
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
}
