import React from "react";
import { Link, useRouteError } from "react-router-dom";
import NotFound from "../assets/images/not-found.svg";

const ErrorPage = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div>
        ErrorPage
        <img src={NotFound} alt="page not found" width="250" />
        <h3>{error.data}</h3>
        <Link to="/">Back Home</Link>
      </div>
    );
  }

  return (
    <div>
      ErrorPage
      <h3>{error.data}</h3>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default ErrorPage;
