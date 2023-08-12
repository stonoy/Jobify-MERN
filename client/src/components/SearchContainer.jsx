import React from "react";
import FormRow from "./FormRow";
import FormSelect from "./FormSelect";
import { Form, Link, useNavigate, useSubmit } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE, SORT_TYPE } from "../utils/jobValues";
import { AllJobValues } from "../pages/AllJob";

const SearchContainer = () => {
  console.log("searchContainer IN");
  const {
    searchValues: { search, jobLocation, jobType, status, sort },
  } = AllJobValues();

  console.log(search, jobLocation, jobType, status, sort);

  const navigate = useNavigate();

  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };
  return (
    <section>
      <Form>
        <FormRow
          type="search"
          name="search"
          defaultValue={search}
          required={false}
          onChange={debounce((form) => {
            submit(form);
          })}
        />
        <FormRow
          type="search"
          name="jobLocation"
          defaultValue={jobLocation}
          required={false}
          onChange={debounce((form) => {
            submit(form);
          })}
        />
        <FormSelect
          name="jobType"
          list={["all", ...Object.values(JOB_TYPE)]}
          defaultValue={jobType}
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
        <FormSelect
          name="status"
          list={["all", ...Object.values(JOB_STATUS)]}
          defaultValue={status}
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
        <FormSelect
          name="sort"
          list={Object.values(SORT_TYPE)}
          defaultValue={sort}
          onChange={(e) => {
            submit(e.currentTarget.form);
          }}
        />
        <Link to="/dashboard">Reset</Link>
      </Form>
      {/* {<button onClick={() => navigate("/dashboard")}>Reset Search</button>} */}
    </section>
  );
};

export default SearchContainer;
