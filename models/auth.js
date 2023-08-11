import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls provide a name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "pls provide a email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "pls provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "pls provide a password"],
    minlength: 3,
    maxlength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.CreateToken = function () {
  return Jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

UserSchema.methods.ComparePassword = async function (givenPassword) {
  const isMatch = await bcrypt.compare(givenPassword, this.password);
  return isMatch;
};

UserSchema.methods.RemovePassword = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
