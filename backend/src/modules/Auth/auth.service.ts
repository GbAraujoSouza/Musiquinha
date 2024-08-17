import { EStatusErrors } from "../../enum/status-errors.enum";
import prisma from "../../prismaConnection";
import auth from "../../config/auth";
import { Prisma } from "@prisma/client";

export class AuthService {
  public static async login(email: string, password: string) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    if (!auth.checkPassword(password, findUser.hash, findUser.salt)) {
      throw new Error(EStatusErrors.E401);
    }

    return auth.generateJWT(findUser);
  }
}
