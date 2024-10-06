import crypto from "crypto";

export default class SongUtils {
  public static randomSongName(bytes: number = 32): string {
    return crypto.randomBytes(bytes).toString("hex");
  }
}
