import { Prisma, Playlist, Song } from "@prisma/client";
import prisma from "../../prismaConnection";
import { EStatusErrors } from "../../enum/status-errors.enum";

export class PlaylistService {
  public static async create(
    name: string,
    description: string,
    userId: string
  ) {
    const playlistInput: Prisma.PlaylistCreateInput = {
      name,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
      songs: {
        connect: [],
      },
    };

    const createdPlaylist = await prisma.playlist.create({
      data: playlistInput,
    });

    return createdPlaylist;
  }

  public static async index(): Promise<Playlist[]> {
    const playlists = await prisma.playlist.findMany({
      include: {
        user: true,
        songs: true,
      },
    });

    if (!playlists) throw new Error(EStatusErrors.E404);

    return playlists;
  }

  public static async show(playlistId: string): Promise<Playlist> {
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        user: true,
        songs: true,
      },
    });

    if (!playlist) throw new Error(EStatusErrors.E404);

    return playlist;
  }

  public static async update(
    playlistId: string,
    name: string,
    description: string
  ): Promise<Playlist> {
    const updatedPlaylist = await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        name,
        description,
      },
      include: {
        songs: true,
      },
    });

    if (!updatedPlaylist) throw new Error(EStatusErrors.E404);

    return updatedPlaylist;
  }

  public static async delete(playlistId: string): Promise<void> {
    await prisma.playlist.delete({
      where: { id: playlistId },
    });
  }

  public static async addSong(
    playlistId: string,
    songId: string
  ): Promise<Playlist> {
    const updatedPlaylist = await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        songs: {
          connect: {
            id: songId,
          },
        },
      },
      include: {
        songs: true,
      },
    });

    if (!updatedPlaylist) throw new Error(EStatusErrors.E404);

    return updatedPlaylist;
  }

  public static async removeSong(
    playlistId: string,
    songId: string
  ): Promise<Playlist> {
    const updatedPlaylist = await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        songs: {
          disconnect: {
            id: songId,
          },
        },
      },
      include: {
        songs: true,
      },
    });

    if (!updatedPlaylist) throw new Error(EStatusErrors.E404);

    return updatedPlaylist;
  }
}
