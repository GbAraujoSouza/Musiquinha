import { Request, Response } from "express";
import { SongService } from "./song.service";
import { ECrud } from "../../enum/crud.enum";
import ErrorHandler from "../../utils/errorHandler";
import { EStatusErrors } from "../../enum/status-errors.enum";

export class SongController {
  public static async create(request: Request, response: Response) {
    try {
      const { title } = request.body;

      if (!request.user)
        return response.status(400).json({ message: "Error in token" });

      const artistId = request.user as string;

      const file = request.file as Express.Multer.File;

      if (!file) {
        return response.status(400).json({
          message: EStatusErrors.E400,
        });
      }

      return response.status(201).json({
        message: ECrud.CREATE,
        data: await SongService.create(title, file, artistId),
      });
    } catch (error) {
      return response.status(500).json({
        message: EStatusErrors.E500,
        error: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async show(request: Request, response: Response) {
    try {
      const { songId } = request.params;

      return response.status(200).json({
        message: ECrud.READ,
        data: await SongService.show(songId),
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async index(request: Request, response: Response) {
    try {
      console.log(request.user);
      return response.status(200).json({
        message: ECrud.READ,
        data: await SongService.index(),
      });
    } catch (error) {
      return response.status(404).json({
        message: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async getFavorites(request: Request, response: Response) {
    try {
      if (!request.user)
        return response.status(400).json({ message: "Error in token" });

      const userId = request.user as string;


      const likedSongs = await SongService.getFavorites(userId);

      return response.status(201).json({
        message: ECrud.READ,
        data: likedSongs,
      });
    } catch (error) {
      return response
        .status(404)
        .json({ error: ErrorHandler.getErrorMessage(error) });
    }
  }
}
