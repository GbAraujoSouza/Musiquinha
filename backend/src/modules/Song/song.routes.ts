import { Router } from "express";

import { SongController } from "./song.controller";
import multer from "multer";
import passport from "passport";
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

router.get(
  `${baseUrl}/favorites`,
  passport.authenticate("jwt", { session: false }),
  SongController.getFavorites,
);

router.get(
  `${baseUrl}/:songId`,
  passport.authenticate("jwt", { session: false }),
  SongController.show,
);


export const songRouter = router;
