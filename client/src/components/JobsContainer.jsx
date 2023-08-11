import React from "react";
import Job from "./Job";
import { AllJobValues } from "../pages/AllJob";

const JobsContainer = () => {
  const {
    data: { jobs, numOfJobs },
  } = AllJobValues();
  
  if (numOfJobs === 0) {
    return <h3>No jobs to display</h3>;
  }

  return (
    <div>
      <h3>
        There are {numOfJobs} job{numOfJobs > 1 ? "s" : ""}
      </h3>
      {jobs.map((job) => (
        <Job key={job._id} {...job} />
      ))}
    </div>
  );
};

export default JobsContainer;
