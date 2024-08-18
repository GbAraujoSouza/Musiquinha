import api from "../api";

interface LoginData {
  email: string;
  password: string;
}

export default {
  async login(data: LoginData) {
    try {
      const response = api.post("/auth/login", data);
      return response;
    } catch (error) {
      console.log(error); 
    }
  }
}
