import { userRouter } from "../modules/User/user.routes";
import { authRouter } from "../modules/Auth/auth.routes";

export const router = [userRouter, authRouter];
