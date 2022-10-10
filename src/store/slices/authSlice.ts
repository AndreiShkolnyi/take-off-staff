import { IAuth, IUser } from "./../../models/models";
import { AppDispatch } from "./../store";
import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

let initialState = localStorage.getItem("accessToken")
  ? {
      loading: false,
      error: null,
      user: JSON.parse(localStorage.getItem("user") as string),
      isLoggedIn: true,
      isAuthenticated: true,
      accessToken: localStorage.getItem("accessToken"),
    }
  : {
      loading: false,
      error: null,
      user: null,
      isLoggedIn: false,
      isAuthenticated: false,
      accessToken: "",
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state) => {
      state.accessToken = localStorage.getItem("accessToken");
    },
    addUser: (state) => {
      state.user = localStorage.getItem("user");
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

const { reducer: authReducer, actions } = authSlice;
const { userLoggedOut, authRequestSuccess, authRequestFailed } = actions;

export const loginUser = (data: IAuth) => async (dispatch: AppDispatch) => {
  const { email, password } = data;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    dispatch(authRequestSuccess(data));
    localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  dispatch(userLoggedOut());
};

export const getCurrentUserData = () => (state: IUser) => {
  return state.user;
};
export const getUsersAuthStatus = () => (state: IUser) => {
  return state.user.isAuthenticated;
};

const authRequested = createAction("users/authRequested");

export default authReducer;
