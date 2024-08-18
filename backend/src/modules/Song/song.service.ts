import { Prisma } from "@prisma/client";
import { EStatusErrors } from "../../enum/status-errors.enum";
import prisma from "../../prismaConnection";
import getAudioDurationInSeconds from "get-audio-duration";

export class SongService {
  public static async create(
    title: string,
    filePath: string,
    artistId: string,
  ) {
    const duration = await getAudioDurationInSeconds(filePath);

    const songInput: Prisma.SongCreateInput = {
      title,
      duration: Math.round(duration),
      url: filePath,
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
}
