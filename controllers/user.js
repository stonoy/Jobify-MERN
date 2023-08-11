import User from "../models/auth.js";
import Job from "../models/jobs.js";
import { StatusCodes } from "http-status-codes";
import { createCustomApiError } from "../error/customApiError.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

const getCurrentUser = async (req, res, next) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    next(
      createCustomApiError("No such user found in DB", StatusCodes.BAD_REQUEST)
    );
  }

  const userWithoutPassword = user.RemovePassword();
  res.status(StatusCodes.OK).json({ userWithoutPassword });
};

const updateUser = async (req, res, next) => {
  console.log(req.file);
  let newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  // console.log(newUser);

  const {
    user: { userId },
    body: { name, email },
  } = req;

  if (!name || !email) {
    return next(
      createCustomApiError(`provide name and email`, StatusCodes.BAD_REQUEST)
    );
  }

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const user = await User.findOneAndUpdate({ _id: userId }, newUser);

  if (req.file && user.avatarPublicId) {
    console.log("in");
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }
  //   const token = user.CreateToken();

  res.status(StatusCodes.OK).json({
    msg: "user updated!",
  });
};

const adminSpecial = async (req, res, next) => {
  console.log(req.user.isAdmin);

  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ userCount, jobCount });
};

export { getCurrentUser, updateUser, adminSpecial };
