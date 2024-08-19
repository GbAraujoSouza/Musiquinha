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
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      // },
    });

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    if (!auth.checkPassword(password, findUser.hash, findUser.salt)) {
      throw new Error(EStatusErrors.E401);
    }

    return {
      user: {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        isArtist: findUser.isArtist,
      },
      token: auth.generateJWT(findUser),
    };
  }
}
