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

    await prisma.favorites.create({
      data: {
        user: {
          connect: { id: createdUser.id },
        },
      },
    });

    if (isArtist) {
      await prisma.artist.create({
        data: { userId: createdUser.id },
      });
    }

    return createdUser;
  }

  public static async index(limit: number, offset: number) {
    return await prisma.user.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
        isArtist: true,
      }
    });
  }

  public static async show(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isArtist: true,
      },
    });

    if (!user) throw new Error(EStatusErrors.E404);

    return user;
  }

  public static async update(userId: string, name: string, email: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error(EStatusErrors.E404);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });
  }

  public static async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error(EStatusErrors.E404);

    await prisma.user.delete({
      where: { id: userId },
    });
  }
}
