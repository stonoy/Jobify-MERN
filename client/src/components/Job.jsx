import React from "react";
import styled from "styled-components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Form, Link } from "react-router-dom";
day.extend(advancedFormat);

const Job = ({
  _id,
  company,
  position,
  status,
  jobLocation,
  jobType,
  createdAt,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <h3>{company}</h3>
      <p>{date}</p>
      <p>{position}</p>
      <p>{status}</p>
      <p>{jobLocation}</p>
      <p>{jobType}</p>
      <div className="btn-container">
        <Link to={`./editjob/${_id}`}>Edit</Link>
        <Form method="post" action={`./delete/${_id}`}>
          <button type="submit">Delete</button>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 250px;
  border: 2px solid #333;
  margin: 5px;
`;

export default Job;
