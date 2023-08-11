import React from "react";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import { Stats } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/admin-special");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { userCount, jobCount } = useLoaderData();
  return (
    <div>
      <h3>Admin Section</h3>
      <Stats color="blue" bgc="#f7b3b3" title="Users" count={userCount} />
      <Stats color="purple" bgc="#a3a0a0" title="Jobs" count={jobCount} />
    </div>
  );
};

export default Admin;
