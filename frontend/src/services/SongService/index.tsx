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

  async getFavorites(userId: string): Promise<AxiosPromise<any> | null> {
    try {
      const response = api.get(`/song/favorites/${userId}`);
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  },
};
