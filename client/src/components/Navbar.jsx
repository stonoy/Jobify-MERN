import React, { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { dashBoardValue } from "../pages/DashBoard";

const Navbar = () => {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const { user, toggleSideBar, logout } = dashBoardValue();

  return (
    <Wrapper>
      <button onClick={() => toggleSideBar()}>
        <FaAlignLeft />
      </button>
      <h2>DashBoard</h2>
      <div className="btn-container">
        <button onClick={() => setLogoutBtn(!logoutBtn)}>
          <FaUserCircle />
          {user?.name}
          <FaCaretDown />
        </button>
        <button
          style={{ display: logoutBtn ? "block" : "none" }}
          onClick={() => logout()}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  .btn-container {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
  }
`;

export default Navbar;
