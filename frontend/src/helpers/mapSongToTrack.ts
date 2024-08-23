import { Track } from "react-native-track-player";
import DefaultSongImage from "../assets/default-song-cover.png";

const mapSongToTrack = (song: Song): Track => {
  return {
    id: song.id,
    url: song.songPublicUrl,
    title: song.title,
    artist: song.artist.name,
    artwork: DefaultSongImage,
    album: song.album ? song.album : undefined,
  };
};

export default mapSongToTrack;
