import { Router } from "express";

import { UserController } from "./user.controller";


const router = Router();
const baseUrl = "/user";

router.post(`${baseUrl}`, UserController.create);


export const userRouter = router;
