import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentUserData,
  getUsersAuthStatus,
  logoutUser,
} from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
export const Navigation = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(getCurrentUserData());
  const isAuth = useSelector(getUsersAuthStatus());

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="flex justify-between w-full items-center drop-shadow h-[50px] px-5 bg-gray-100">
      <Link to={"/"}>Contacts List</Link>

      <div className="flex justify-between px-5">
        {!isAuth ? (
          <Link to={"/auth"}>Auth</Link>
        ) : (
          <>
            <Link to={"/contacts"}>Contacts</Link>
            <p className="px-5 font-bold">{currentUser.user.email}</p>
            <button className="btn " onClick={logoutHandler}>
              logOut
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
