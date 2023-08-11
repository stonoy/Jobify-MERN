import React from "react";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/jobValues";
import FormSelect from "../components/FormSelect";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.post("/jobs", data);
    console.log("Job created!");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  return (
    <Form method="post">
      <h2>Add Job</h2>
      <FormRow
        type="text"
        name="company"
        defaultValue="facebook"
        labelText="Company"
      />
      <FormRow
        type="text"
        name="position"
        defaultValue="frontEnd Dev"
        labelText="Position"
      />
      <FormRow
        type="text"
        name="jobLocation"
        defaultValue={user.location}
        labelText="Job Location"
      />
      <FormSelect
        name="status"
        labelText="Status"
        defaultValue={JOB_STATUS.PENDING}
        list={Object.values(JOB_STATUS)}
      />
      <FormSelect
        name="jobType"
        labelText="Job Type"
        defaultValue={JOB_TYPE.FULL_TIME}
        list={Object.values(JOB_TYPE)}
      />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default AddJob;
