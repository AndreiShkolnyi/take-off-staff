import { IAuth } from "./../models/models";
import axios from "axios";

const httpAuth = axios.create({
  baseURL: "http://localhost:3000/",
});

const authService = {
  login: async ({ email, password }: IAuth) => {
    const { data } = await httpAuth.post(`login`, {
      email,
      password,
    });
    return data;
  },
};

export default authService;
