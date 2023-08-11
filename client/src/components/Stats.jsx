import React from "react";
import styled from "styled-components";

const Stats = ({ color, bgc, title, count }) => {
  return (
    <Wrapper color={color} bgc={bgc}>
      <h4>{title}</h4>
      <h3>{count}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border: 2px solid ${(prop) => prop.color};
  width: 150px;
  height: 150px;
  background-color: ${(prop) => prop.bgc};
`;

export default Stats;
