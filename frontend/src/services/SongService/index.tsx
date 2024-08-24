import { AxiosPromise } from "axios";
import { handleError } from "../../helpers/errorHandler";
import api from "../api";

export default {
  async getTopSongs(token: string): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.get("/song/ordered-by-likes", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async getFavorites(token: string): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.get(`/song/favorites`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async favoriteSong(songId: string, token: string) {
    try {
      const response = api.put(
        `/song/favorite-song/${songId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async unFavoriteSong(songId: string, token: string) {
    try {
      const response = api.put(
        `/song/unfavorite-song/${songId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },

  async searchSongs(token: string, query?: string) {
    try {
      const response = api.get(`/song/search-songs/`, {
        params: { title: query },
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
};
