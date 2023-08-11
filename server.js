import express from "express";
import "express-async-errors";
// import cors from "cors";
import authRoute from "./routes/auth.js";
import jobsRoute from "./routes/jobs.js";
import userRoute from "./routes/user.js";
import { auth } from "./middlewares/authentication.js";
import connectDB from "./DB/connectDB.js";
import {} from "dotenv/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import Not_Found from "./middlewares/not-found.js";
import Error_Handler from "./middlewares/error-handler.js";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ msg: "test ok" });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", auth, jobsRoute);
app.use("/api/v1/user", auth, userRoute);

app.use(Not_Found);
app.use(Error_Handler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening at port ${port}`);
    });
  } catch (error) {
    console.log(`Listening error ... ${error}`);
  }
};

start();
