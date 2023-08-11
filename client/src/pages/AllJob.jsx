import React, { createContext, useContext } from "react";
import { SearchContainer, JobsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const AllJobContext = createContext();

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  console.log(params);
  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    const searchValues = { ...params };
    // console.log(data);
    return { data, searchValues };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const AllJob = () => {
  const loaderData = useLoaderData();

  // console.log(loaderData);

  if (!loaderData) {
    return <h3>Error Occured</h3>;
  }

  const data = loaderData?.data;
  const searchValues = loaderData?.searchValues;
  // console.log(data);
  return (
    <AllJobContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobContext.Provider>
  );
};

export const AllJobValues = () => useContext(AllJobContext);

export default AllJob;
