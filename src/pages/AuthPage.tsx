import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
export const AuthPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const loginHandler = () => {
    dispatch(loginUser(form));
    navigate("/");
  };

  return (
    <form className="container mx-auto mt-8 p-4 flex justify-center">
      <div>
        <div>
          <label htmlFor="email" className="mr-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="border"
            name="email"
            onChange={changeHandler}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border"
            name="password"
            onChange={changeHandler}
          />
        </div>

        <button
          type="button"
          className="border py-2 px-4"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </form>
  );
};
