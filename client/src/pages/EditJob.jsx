import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { JOB_STATUS, JOB_TYPE } from "../utils/jobValues";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { FormRow, FormSelect } from "../components";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch.get(`/jobs/${id}`);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error?.response?.data?.msg;
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const { id } = params;

  try {
    await customFetch.patch(`/jobs/${id}`, data);
    console.log("Job updated!");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const data = useLoaderData();

  if (!data?.job) {
    return <h3>{data}</h3>;
  }
  const {
    job: { company, position, status, jobLocation, jobType },
  } = data;
  return (
    <Form method="post">
      <h2>Edit Job</h2>
      <FormRow
        type="text"
        name="company"
        defaultValue={company}
        labelText="Company"
      />
      <FormRow
        type="text"
        name="position"
        defaultValue={position}
        labelText="Position"
      />
      <FormRow
        type="text"
        name="jobLocation"
        defaultValue={jobLocation}
        labelText="Job Location"
      />
      <FormSelect
        name="status"
        labelText="Status"
        defaultValue={status}
        list={Object.values(JOB_STATUS)}
      />
      <FormSelect
        name="jobType"
        labelText="Job Type"
        defaultValue={jobType}
        list={Object.values(JOB_TYPE)}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default EditJob;
