import { Request, Response } from "express";
import { PlaylistService } from "./playlist.service";
import { ECrud } from "../../enum/crud.enum";
import ErrorHandler from "../../utils/errorHandler";
import { EStatusErrors } from "../../enum/status-errors.enum";

export class PlaylistController {
  public static async create(request: Request, response: Response) {
    try {
      if (!request.user)
        return response.status(400).json({ message: "Error in token" });

      const userId = request.user as string;
      const { name, description } = request.body;

      const playlist = await PlaylistService.create(name, description, userId);

      return response.status(201).json({
        message: ECrud.CREATE,
        data: playlist,
      });
    } catch (error) {
      return response.status(500).json({
        message: EStatusErrors.E500,
        error: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async index(request: Request, response: Response) {
    try {
      const playlists = await PlaylistService.index();

      return response.status(200).json({
        message: ECrud.READ,
        data: playlists,
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async show(request: Request, response: Response) {
    try {
      const { playlistId } = request.params;

      const playlist = await PlaylistService.show(playlistId);

      return response.status(200).json({
        message: ECrud.READ,
        data: playlist,
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async update(request: Request, response: Response) {
    try {
      const { playlistId } = request.params;
      const { name, description } = request.body;

      const updatedPlaylist = await PlaylistService.update(
        playlistId,
        name,
        description
      );

      return response.status(200).json({
        message: ECrud.UPDATE,
        data: updatedPlaylist,
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async delete(request: Request, response: Response) {
    try {
      const { playlistId } = request.params;

      await PlaylistService.delete(playlistId);

      return response.status(200).json({
        message: ECrud.DELETE,
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async addSong(request: Request, response: Response) {
    try {
      const { playlistId, songId } = request.params;

      const updatedPlaylist = await PlaylistService.addSong(playlistId, songId);

      return response.status(200).json({
        message: ECrud.UPDATE,
        data: updatedPlaylist,
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async removeSong(request: Request, response: Response) {
    try {
      const { playlistId, songId } = request.params;

      const updatedPlaylist = await PlaylistService.removeSong(
        playlistId,
        songId
      );

      return response.status(200).json({
        message: ECrud.UPDATE,
        data: updatedPlaylist,
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }
}
