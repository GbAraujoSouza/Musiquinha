import { Router } from "express";

import { SongController } from "./song.controller";
import multer from "multer";
// import upload from "../../config/file";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();
const baseUrl = "/song";

router.post(`${baseUrl}/`, upload.single("song"), SongController.create);

router.get(`${baseUrl}/list-all`, SongController.index);
router.get(`${baseUrl}/:songId`, SongController.show);

export const songRouter = router;
