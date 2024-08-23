import { AxiosPromise } from "axios";
import { handleError } from "../../helpers/errorHandler";
import api from "../api";

export default {
  async getPlaylists(token: string): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.get(`/playlist/list-all`, {
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

  async createPlaylist(
    name: string,
    description: string,
    token: string,
  ): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.post(
        `/playlist`,
        { name, description },
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

  async addSongToPlaylist(
    playlistId: string,
    songId: string,
    token: string,
  ): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.put(
        `/playlist/${playlistId}/add-song/${songId}`,
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

  async removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    token: string,
  ): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.put(
        `/playlist/${playlistId}/remove-song/${songId}`,
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
};
