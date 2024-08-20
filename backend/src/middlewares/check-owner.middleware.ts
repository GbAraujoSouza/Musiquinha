import { Request, Response, NextFunction } from "express";
import { EStatusErrors } from "../enum/status-errors.enum";

export class CheckOwnerMiddleware {
  public static async checkOwner(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (!request.user)
      return response.status(400).json({ message: "Error in token" });

    const { userId } = request.params;

    if (userId && userId !== request.user) {
      return response.status(400).json({
        message: EStatusErrors.E400,
      });
    }

    next();
  }
}
