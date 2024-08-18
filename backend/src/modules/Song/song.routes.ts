import { Router } from "express";

import { SongController } from "./song.controller";
import upload from "../../config/file";


const router = Router();
const baseUrl = "/song";

router.post(`${baseUrl}/`, upload.single("song"), SongController.create);

router.get(`${baseUrl}/list-all`, SongController.index);
router.get(`${baseUrl}/:songId`, SongController.show);


export const songRouter = router;


