import { Router } from "express";

import { SongController } from "./song.controller";
import multer from "multer";
import passport from "passport";
import { CheckOwnerMiddleware } from "../../middlewares/check-owner.middleware";
// import upload from "../../config/file";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();
const baseUrl = "/song";

router.post(
  `${baseUrl}/`,
  passport.authenticate("jwt", { session: false }),
  upload.single("song"),
  SongController.create,
);

router.get(
  `${baseUrl}/list-all`,
  passport.authenticate("jwt", { session: false }),
  SongController.index,
);

router.put(
  `${baseUrl}/favorite-song/:songId`,
  passport.authenticate("jwt", { session: false }),
  SongController.favoriteSong,
);

router.put(
  `${baseUrl}/unfavorite-song/:songId`,
  passport.authenticate("jwt", { session: false }),
  SongController.unfavoriteSong,
);

router.get(
  `${baseUrl}/favorites/:userId`,
  passport.authenticate("jwt", { session: false }),
  CheckOwnerMiddleware.checkOwner,
  SongController.getFavorites,
);

router.get(
  `${baseUrl}/:songId`,
  passport.authenticate("jwt", { session: false }),
  SongController.show,
);

export const songRouter = router;

