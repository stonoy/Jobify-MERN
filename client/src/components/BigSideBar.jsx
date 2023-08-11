import React from "react";
import NavLinks from "./NavLinks";
import styled from "styled-components";
import { dashBoardValue } from "../pages/DashBoard";

const BigSideBar = () => {
  const { isSideBarOpen } = dashBoardValue();
  return (
    <Wrapper className={!isSideBarOpen ? "hideBigSideBar" : "showBigSideBar"}>
      <NavLinks stayOnSideBar={false} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background-color: whitesmoke;
  margin-right: 2px solid #333;
  width: 15vw;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default BigSideBar;
