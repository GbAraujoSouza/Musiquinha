import { Router } from "express";

import { UserController } from "./user.controller";
import passport from "passport";

const router = Router();
const baseUrl = "/user";

router.post(`${baseUrl}`, UserController.create);

router.get(`${baseUrl}/index`, UserController.index);

router.get(
  `${baseUrl}/show/:userId`,
  passport.authenticate("jwt", { session: false }),
  UserController.show,
);

router.put(
  `${baseUrl}/`,
  passport.authenticate("jwt", { session: false }),
  UserController.update,
);

router.delete(
  `${baseUrl}/`,
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser,
);

export const userRouter = router;
