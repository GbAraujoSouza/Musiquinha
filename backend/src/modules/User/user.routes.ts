import { Router } from "express";

import { UserController } from "./user.controller";
import passport from "passport";
import { CheckOwnerMiddleware } from "../../middlewares/check-owner.middleware";

const router = Router();
const baseUrl = "/user";

router.post(`${baseUrl}`, UserController.create);

router.get(`${baseUrl}/index`, UserController.index);

router.get(
  `${baseUrl}/show/:userId`,
  passport.authenticate("jwt", { session: false }),
  CheckOwnerMiddleware.checkOwner,
  UserController.show,
);

router.put(
  `${baseUrl}/:userId`,
  passport.authenticate("jwt", { session: false }),
  CheckOwnerMiddleware.checkOwner,
  UserController.update,
);

router.delete(
  `${baseUrl}/:userId`,
  passport.authenticate("jwt", { session: false }),
  CheckOwnerMiddleware.checkOwner,
  UserController.deleteUser,
);

export const userRouter = router;
