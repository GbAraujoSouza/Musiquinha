import { Router } from "express";

import { AuthController } from "./auth.controller";


const router = Router();
const baseUrl = "/auth";

router.post(`${baseUrl}/login`, AuthController.login);


export const authRouter = router;

