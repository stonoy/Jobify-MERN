import express from "express";
const router = express.Router();

import {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getSingleJob,
  stats,
} from "../controllers/jobs.js";

router.route("/").get(getAllJobs).post(createJob);
router.get("/stats", stats);
router.route("/:id").patch(updateJob).delete(deleteJob).get(getSingleJob);

export default router;
