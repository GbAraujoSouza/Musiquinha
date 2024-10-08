import { Router } from "express";

import { SongController } from "./song.controller";
import multer from "multer";
import passport from "passport";

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
  `${baseUrl}/search-songs`,
  passport.authenticate("jwt", { session: false }),
  SongController.searchSongs,
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
  `${baseUrl}/favorites`,
  passport.authenticate("jwt", { session: false }),
  SongController.getFavorites,
);

router.get(
  `${baseUrl}/ordered-by-likes`,
  passport.authenticate("jwt", { session: false }),
  SongController.getSongsOrderedByLikes,
);

router.get(
  `${baseUrl}/:songId`,
  passport.authenticate("jwt", { session: false }),
  SongController.show,
);

router.delete(
  `${baseUrl}/:songId/user`,
  passport.authenticate("jwt", { session: false }),
  SongController.deleteSong,
);

export const songRouter = router;
