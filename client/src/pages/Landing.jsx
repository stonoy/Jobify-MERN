import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h2>Landing Page</h2>
      <Link to="/login">Register/Login</Link>
    </div>
  );
};

export default Landing;
