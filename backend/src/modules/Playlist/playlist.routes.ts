import { Router } from "express";
import { PlaylistController } from "./playlist.controller";
import passport from "passport";
import { CheckOwnerMiddleware } from "../../middlewares/check-owner.middleware";

const router = Router();
const baseUrl = "/playlist";

router.post(
  `${baseUrl}/`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.create
);

router.get(
  `${baseUrl}/list-all/`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.index
);

router.get(
  `${baseUrl}/:playlistId`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.show
);

router.put(
  `${baseUrl}/:playlistId`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.update
);

router.delete(
  `${baseUrl}/:playlistId`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.delete
);

router.put(
  `${baseUrl}/:playlistId/add-song/:songId`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.addSong
);

router.put(
  `${baseUrl}/:playlistId/remove-song/:songId`,
  passport.authenticate("jwt", { session: false }),
  PlaylistController.removeSong
);

export const playlistRouter = router;
