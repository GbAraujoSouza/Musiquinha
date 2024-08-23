import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import PlaylistService from "../services/PlaylistService";
import { Playlist } from "../models/playlist";

interface PlaylistsContextValue {
  playlists: Playlist[];
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  createPlaylist: (name: string, description: string) => void;
  isSongInPlaylist: (playlistId: string, songId: string) => boolean;
}

interface PlaylistsProviderProps {
  children: ReactNode;
}

const PlaylistsContext = createContext<PlaylistsContextValue | null>(null);

export const PlaylistsProvider = ({ children }: PlaylistsProviderProps) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const { token } = useAuth();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await PlaylistService.getPlaylists(token as string);
        setPlaylists(response?.data.data);
      } catch (error) {
        console.log("Failed to fetch playlists ", error);
      }
    };

    fetchPlaylists();
  }, []);

  const addSongToPlaylist = async (playlistId: string, song: Song) => {
    try {
      await PlaylistService.addSongToPlaylist(
        playlistId,
        song.id,
        token as string,
      );
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? { ...playlist, songs: [...playlist.songs, song] }
            : playlist,
        ),
      );
    } catch (error) {
      console.error("Failed to add song to playlist", error);
    }
  };

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    try {
      await PlaylistService.removeSongFromPlaylist(
        playlistId,
        songId,
        token as string,
      );
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: playlist.songs.filter((song) => song.id !== songId),
              }
            : playlist,
        ),
      );
    } catch (error) {
      console.error("Failed to remove song from playlist", error);
    }
  };

  const createPlaylist = async (name: string, description: string) => {
    try {
      const newPlaylist = await PlaylistService.createPlaylist(
        name,
        description,
        token as string,
      );
      setPlaylists((prevPlaylists) => [
        ...prevPlaylists,
        newPlaylist?.data.data,
      ]);
    } catch (error) {
      console.error("Failed to create playlist", error);
    }
  };

  const isSongInPlaylist = (playlistId: string, songId: string) => {
    const playlist = playlists.find((playlist) => playlist.id === playlistId);
    return playlist ? playlist.songs.some((song) => song.id === songId) : false;
  };

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        addSongToPlaylist,
        removeSongFromPlaylist,
        createPlaylist,
        isSongInPlaylist,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  const context = useContext(PlaylistsContext);
  if (!context)
    throw new Error("usePlaylists must be used within a PlaylistsProvider");
  return context;
};
