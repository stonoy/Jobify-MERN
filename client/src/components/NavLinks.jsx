import React from "react";
import { Links } from "../utils/Links";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { dashBoardValue } from "../pages/DashBoard";

const NavLinks = ({ stayOnSideBar }) => {
  const { isSideBarOpen, toggleSideBar, user } = dashBoardValue();
  const toggle = () => {
    if (stayOnSideBar) {
      toggleSideBar();
      return;
    }
  };

  return (
    <Wrapper>
      {Links.map((link) => {
        if (link.path === "admin" && user.role !== "admin") {
          return;
        }
        return (
          <NavLink key={link.id} to={link.path} onClick={toggle} end>
            {link.title}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export default NavLinks;
