import { userRouter } from "../modules/User/user.routes";
import { authRouter } from "../modules/Auth/auth.routes";
import { songRouter } from "../modules/Song/song.routes";
import { playlistRouter } from "../modules/Playlist/playlist.routes";

export const router = [userRouter, authRouter, songRouter, playlistRouter];
