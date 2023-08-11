import React from "react";
import { Form, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  // const data = Object.fromEntries(formData);

  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    console.log("file size too large");
    return null;
  }

  try {
    await customFetch.patch("/user/updateuser", formData);
    console.log("user updated");
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const {
    user: { name, email, lastName, location },
  } = useOutletContext();

  return (
    <Form method="post" encType="multipart/form-data">
      <h3>Profile Page</h3>
      <label htmlFor="avatar">select an image file (max 0.5mb)</label>
      <input type="file" id="avatar" name="avatar" accept="image/*" />
      <FormRow type="text" name="name" defaultValue={name} labelText="Name" />
      <FormRow
        type="text"
        name="email"
        defaultValue={email}
        labelText="Email"
      />
      <FormRow
        type="text"
        name="lastName"
        defaultValue={lastName}
        labelText="Last Name"
      />
      <FormRow
        type="text"
        name="location"
        defaultValue={location}
        labelText="Location"
      />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default Profile;
