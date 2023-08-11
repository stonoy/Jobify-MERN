import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "pls provide company name"],
      maxlength: 20,
    },
    position: {
      type: String,
      required: [true, "pls provide position in the job"],
      maxlength: 20,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [
        true,
        "pls attach userId from req.user to req.body as createdBy",
      ],
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: [true, "pls provide job location"],
    },
    status: {
      type: String,
      enum: ["declined", "pending", "interviewing"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobsSchema);
