import { createCustomApiError } from "../error/customApiError.js";
import { StatusCodes } from "http-status-codes";
import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  //   console.log(req.headers.authorization);

  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   return next(
  //     createCustomApiError(
  //       "Provide authorization header",
  //       StatusCodes.UNAUTHORIZED
  //     )
  //   );
  // }

  // const token = authHeader.split(" ")[1];

  // if (!token) {
  //   return next(
  //     createCustomApiError(
  //       "Provide authorization token",
  //       StatusCodes.UNAUTHORIZED
  //     )
  //   );
  // }
  //   console.log(token);  FOR MERN JOBSTER PROJECT(WHERE NO USE OF COOKIES)

  // console.log(req.cookies);

  const token = req.cookies?.token;

  if (!token) {
    next(createCustomApiError("pls provide a token", StatusCodes.UNAUTHORIZED));
  }

  try {
    const { userId, role } = Jwt.verify(token, process.env.JWT_KEY);
    req.user = { userId, role, isAdmin: role !== "admin" ? false : true };
    next();
  } catch (error) {
    next(createCustomApiError("Invalid token", StatusCodes.UNAUTHORIZED));
  }
};

const authorization = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    next(
      createCustomApiError(
        "Not authorised for admin route",
        StatusCodes.FORBIDDEN
      )
    );
  }
  next();
};

export { auth, authorization };
