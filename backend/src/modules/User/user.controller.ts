import { Request, Response } from "express";
import { UserService } from "./user.service";
import { ECrud } from "../../enum/crud.enum";
import ErrorHandler from "../../utils/errorHandler";

export class UserController {
  public static async create(request: Request, response: Response) {
    try {
      const { name, email, password, isArtist } = request.body;

      const createdUser = await UserService.create(name, email, password, isArtist);

      return response.status(201).json({
        message: ECrud.CREATE,
        data: createdUser,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal error.",
        error: ErrorHandler.getErrorMessage(error),
      });
    }
  }
}
