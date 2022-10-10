import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
export const AuthPage: React.FC = () => {
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
    <div className="container mx-auto mt-8 p-4 flex justify-center">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="email"
                onChange={changeHandler}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="password"
                onChange={changeHandler}
              />
            </div>
            <div className="flex items-baseline justify-center">
              <button
                type="button"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
