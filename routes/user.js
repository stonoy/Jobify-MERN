import express from "express";
const router = express.Router();

import upload from "../middlewares/multerMiddleware.js";

import {
  getCurrentUser,
  updateUser,
  adminSpecial,
} from "../controllers/user.js";
import { authorization } from "../middlewares/authentication.js";

router.get("/getcurrentuser", getCurrentUser);
router.patch("/updateuser", upload.single("avatar"), updateUser);
router.get("/admin-special", authorization, adminSpecial);

export default router;
