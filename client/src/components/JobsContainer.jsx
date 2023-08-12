import React from "react";
import Job from "./Job";
import { AllJobValues } from "../pages/AllJob";
import PageContainer from "./PageContainer";

const JobsContainer = () => {
  const {
    data: { jobs, totalJobs, totalPages, currentPage },
  } = AllJobValues();

  if (totalJobs === 0) {
    return <h3>No jobs to display</h3>;
  }

  return (
    <div>
      <h3>
        There are {totalJobs} job{totalJobs > 1 ? "s" : ""}
      </h3>
      {jobs.map((job) => (
        <Job key={job._id} {...job} />
      ))}
      {totalPages > 1 && <PageContainer />}
    </div>
  );
};

export default JobsContainer;
