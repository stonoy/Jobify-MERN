import React, { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BigSideBar, SmallSideBar, Navbar } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/getcurrentuser");
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashBoardContext = createContext();

const DashBoard = () => {
  const { userWithoutPassword: user } = useLoaderData();
  const navigate = useNavigate();
  // console.log("currentUser", user);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const logout = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    console.log("user logged out!");
  };

  return (
    <DashBoardContext.Provider
      value={{ user, isSideBarOpen, toggleSideBar, logout }}
    >
      <Wrapper>
        <div className="sidebar">
          <BigSideBar />
          <SmallSideBar />
        </div>
        <div className="main">
          <Navbar />
          <div className="content">
            <Outlet context={{ user }} />
          </div>
        </div>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};

export const dashBoardValue = () => useContext(DashBoardContext);

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  .main {
    padding: 0.5em;
  }
`;

export default DashBoard;
