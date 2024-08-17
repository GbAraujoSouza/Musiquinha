import { EStatusErrors } from "../../enum/status-errors.enum";
import prisma from "../../prismaConnection";
import auth from "../../config/auth";
import { Prisma } from "@prisma/client";

export class UserService {
  public static async create(
    name: string,
    email: string,
    password: string,
    isArtist: boolean,
  ) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      throw new Error(EStatusErrors.E409);
    }

    const { hash, salt } = auth.generatePassword(password);

    const userInput: Prisma.UserCreateInput = {
      name,
      email,
      hash,
      salt,
      isArtist,
    };

    const createdUser = await prisma.user.create({
      data: userInput,
      select: { id: true, name: true, email: true },
    });

    if (isArtist) {
      await prisma.artist.create({
        data: { userId: createdUser.id },
      });
    }

    return createdUser;
  }
}
