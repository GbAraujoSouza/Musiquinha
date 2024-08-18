import { userRouter } from "../modules/User/user.routes";
import { authRouter } from "../modules/Auth/auth.routes";
import { songRouter } from "../modules/Song/song.routes";

export const router = [userRouter, authRouter, songRouter];
