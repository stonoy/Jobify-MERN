import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  const { id } = params;
  try {
    await customFetch.delete(`/jobs/${id}`);
    console.log("job deleted");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error;
  }
};
