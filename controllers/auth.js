import User from "../models/auth.js";
import { createCustomApiError } from "../error/customApiError.js";
import { StatusCodes } from "http-status-codes";
import Jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createCustomApiError("provide all creds", StatusCodes.BAD_REQUEST)
    );
  }
  const user = await User.create(req.body);

  const token = user.CreateToken();

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user logged in!" });

  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     name: user.name,
  //     email: user.email,
  //     lastName: user.lastName,
  //     location: user.location,
  //     token,
  //   },
  // });  FOR MERN JOBSTER PROJECT(WHERE NO USE OF COOKIES)
};

const login = async (req, res, next) => {
  //   console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      createCustomApiError("provide all creds", StatusCodes.BAD_REQUEST)
    );
  }
  const user = await User.findOne({ email });

  if (!user) {
    return next(
      createCustomApiError(`No user with email ${email}`, StatusCodes.NOT_FOUND)
    );
  }

  const isCorrectPassword = await user.ComparePassword(password);

  if (!isCorrectPassword) {
    return next(
      createCustomApiError(`Incorrect Password`, StatusCodes.UNAUTHORIZED)
    );
  }

  const token = user.CreateToken();

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user logged in!" });

  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     name: user.name,
  //     email: user.email,
  //     lastName: user.lastName,
  //     location: user.location,
  //     token,
  //   },
  // });   FOR MERN JOBSTER PROJECT(WHERE NO USE OF COOKIES)
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export { register, login, logout };
