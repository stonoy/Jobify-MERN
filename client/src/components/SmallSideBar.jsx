import React from "react";
import NavLinks from "./NavLinks";
import styled from "styled-components";
import { dashBoardValue } from "../pages/DashBoard";
import { FaTimes } from "react-icons/fa";

const SmallSideBar = () => {
  const { isSideBarOpen, toggleSideBar } = dashBoardValue();

  return (
    <Wrapper
      className={isSideBarOpen ? "hideSmallSideBar" : "showSmallSideBar"}
    >
      <div className="content">
        <FaTimes onClick={() => toggleSideBar()} />
        <NavLinks stayOnSideBar={true} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: fixed;

  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .content {
    padding: 0.5em;
    background-color: whitesmoke;
    width: 90%;
    margin: auto;
    vertical-align: middle;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default SmallSideBar;
