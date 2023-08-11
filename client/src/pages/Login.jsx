import React from "react";
import {
  Form,
  useNavigation,
  Link,
  useActionData,
  redirect,
} from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  let err = { msg: "" };
  if (data.password.length < 6) {
    err.msg = "password should be 6 charater long";
    return err;
  }

  try {
    await customFetch.post("/auth/login", data);
    console.log("login successful");
    return redirect("/dashboard");
  } catch (error) {
    err.msg = error?.response?.data?.msg;
    return err;
  }
};

const Login = () => {
  const actionData = useActionData();
  return (
    <Form method="post">
      <FormRow
        type="email"
        name="email"
        defaultValue="k1@gmail.com"
        labelText="Email"
      />
      <FormRow
        type="password"
        name="password"
        defaultValue="123456"
        labelText="Password"
      />
      <button type="submit">Submit</button>
      <h4>
        New here <Link to="/register">Register</Link>
      </h4>
      {actionData?.msg && <p>{actionData.msg}</p>}
    </Form>
  );
};

export default Login;
