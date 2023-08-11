import express from "express";
const router = express.Router();

import { register, login, logout } from "../controllers/auth.js";
// import auth from "../middlewares/authentication.js";

router.post("/register", register);
router.post("/login", login);
// router.patch("/update", auth, updateUser);
router.get("/logout", logout);

export default router;
