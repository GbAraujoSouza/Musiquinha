import { handleError } from "../../helpers/errorHandler";
import api from "../api";
import { UserProfile } from "../../models/user";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default {
  async login(data: LoginData) {
    try {
      const response = api.post<{ user: UserProfile; token: string }>(
        "/auth/login",
        data,
      );
      return response;
    } catch (error) {
      handleError(error);
    }
  },

  async register(data: RegisterData) {
    try {
      const response = api.post<UserProfile>("/user", data);
      return response;
    } catch (error) {
      handleError(error);
    }
  },
};
