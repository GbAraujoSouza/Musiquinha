import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import SongService from "../services/SongService";

interface FavoritesContextValue {
  favoriteSongsId: string[];
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteSongsId, setFavoriteSongsId] = useState<string[]>([]);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const userId = user?.id as string;
        const favorites = await SongService.getFavorites(userId, token as string);

        setFavoriteSongsId(favorites?.data.data.map((song: Song) => song.id));
      } catch (error) {
        console.log("Failed to fetch songs ", error);
      }
    };

    fetchFavoriteSongs();
  }, []);

  const toggleFavorite = async (songId: string) => {
    try {
      if (favoriteSongsId.includes(songId)) {
        await SongService.unFavoriteSong(songId, token as string);
        setFavoriteSongsId(favoriteSongsId.filter((id) => id !== songId));
      } else {
        await SongService.favoriteSong(songId, token as string);
        setFavoriteSongsId([...favoriteSongsId, songId]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const isFavorite = (songId: string) => {
    return favoriteSongsId.includes(songId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteSongsId,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
