import Job from "../models/jobs.js";
import { createCustomApiError } from "../error/customApiError.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

const getAllJobs = async (req, res) => {
  let {
    query: { search, jobLocation, jobType, status, sort, page, limit },
    user: { userId },
  } = req;

  let queryObject = { createdBy: userId };

  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  if (jobLocation) {
    queryObject.jobLocation = { $regex: jobLocation, $options: "i" };
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }

  const sortOptions = {
    latest: "-createdAt",
    oldest: "createdAt",
    "a-z": "-position",
    "z-a": "position",
  };

  const sortType = sortOptions[sort] || sortOptions.latest;

  page = Number(page) || 1;
  limit = Number(limit) || 2;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .skip(skip)
    .limit(limit)
    .sort(sortType);

  const totalJobs = await Job.countDocuments(queryObject);
  const totalPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs, totalPages, currentPage: page });

  // const jobs = await Job.find({ createdBy: userId });
  // res.status(200).json({ jobs, numOfJobs: jobs.length });
};

const createJob = async (req, res, next) => {
  // console.log(req.user);
  req.body.createdBy = req.user.userId;
  const { company, position } = req.body;

  if (!company || !position) {
    return next(
      createCustomApiError("Pls provide all creds", StatusCodes.BAD_REQUEST)
    );
  }

  const job = await Job.create(req.body);
  res.status(201).json({ msg: "job created", job });
};

const getSingleJob = async (req, res, next) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    return next(
      createCustomApiError(`No job with id:${jobId}`, StatusCodes.NOT_FOUND)
    );
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res, next) => {
  const {
    params: { id: jobId },
    body: { company, position },
    user: { userId },
  } = req;

  if (!company || !position) {
    return next(
      createCustomApiError("Pls provide all creds", StatusCodes.BAD_REQUEST)
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!job) {
    return next(
      createCustomApiError(`No job with id:${jobId}`, StatusCodes.NOT_FOUND)
    );
  }

  res.status(200).json({ msg: "job updated", job });
};

const deleteJob = async (req, res, next) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    return next(
      createCustomApiError(`No job with id:${jobId}`, StatusCodes.NOT_FOUND)
    );
  }

  res.status(200).json({ msg: "job deleted", job });
};

const stats = async (req, res) => {
  let defaultStats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  defaultStats = defaultStats.reduce((total, current) => {
    const { _id, count } = current;
    total[_id] = count;
    return total;
  }, {});

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 5 },
  ]);

  monthlyApplications = monthlyApplications
    .map((data) => {
      const {
        _id: { year, month },
        count,
      } = data;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, createJob, updateJob, deleteJob, getSingleJob, stats };
