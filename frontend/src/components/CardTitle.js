import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  color: var(--color-white);
  border-bottom: 1px solid white;

  & > h1 {
    text-align: center;
    font-size: 2.4rem;
  }
`;

const CardTitle = ({ children }) => {
  return (
    <StyledTitle>
      <h1>{children}</h1>
    </StyledTitle>
  );
};

export default CardTitle;
