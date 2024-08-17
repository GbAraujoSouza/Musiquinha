import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ECrud } from "../../enum/crud.enum";
import ErrorHandler from "../../utils/errorHandler";
import { EStatusErrors } from "../../enum/status-errors.enum";

export class AuthController {
  public static async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      return response.status(200).json({
        message: ECrud.CREATE,
        data: await AuthService.login(email, password),
      });
    } catch (error) {
      switch (ErrorHandler.getErrorMessage(error)) {
        case EStatusErrors.E401:
          return response.status(401).json({
            message: ErrorHandler.getErrorMessage(error),
          });

        case EStatusErrors.E404:
          return response.status(404).json({
            message: ErrorHandler.getErrorMessage(error),
          });
      }
    }
  }
}
