import { query, Request, Response } from "express";
import { UserService } from "./user.service";
import { ECrud } from "../../enum/crud.enum";
import ErrorHandler from "../../utils/errorHandler";
import { EStatusErrors } from "../../enum/status-errors.enum";

export class UserController {
  public static async create(request: Request, response: Response) {
    try {
      const { name, email, password, isArtist } = request.body;

      const createdUser = await UserService.create(
        name,
        email,
        password,
        isArtist,
      );

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

  public static async index(request: Request, response: Response) {
    try {
      const limit = request.query.limit
        ? parseInt(request.query.limit as string)
        : 30;
      const offset = request.query.offset
        ? parseInt(request.query.offset as string)
        : 0;

      const users = await UserService.index(limit, offset);

      return response.status(201).json({
        message: ECrud.READ,
        data: users,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal error.",
        error: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async show(request: Request, response: Response) {
    try {
      const userId = request.user as string;

      const user = await UserService.show(userId);

      return response.status(201).json({
        message: ECrud.READ,
        data: user,
      });
    } catch (error) {
      return response.status(404).json({
        error: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async update(request: Request, response: Response) {
    try {
      const { name, email } = request.body;

      const userId = request.user as string;

      await UserService.update(userId, name, email);

      return response.status(201).send(ECrud.UPDATE);
    } catch (error) {
      return response.status(500).json({
        message: "Internal error.",
        error: ErrorHandler.getErrorMessage(error),
      });
    }
  }

  public static async deleteUser(request: Request, response: Response) {
    try {
      const userId = request.user as string;

      await UserService.deleteUser(userId);

      response.status(200).send(ECrud.DELETE);
    } catch (error) {
      switch (ErrorHandler.getErrorMessage(error)) {
        case EStatusErrors.E404:
          return response.status(404).json({
            error: ErrorHandler.getErrorMessage(error),
          });

        default:
          response.status(500).json({
            error: EStatusErrors.E500,
          });
          break;
      }
    }
  }
}
