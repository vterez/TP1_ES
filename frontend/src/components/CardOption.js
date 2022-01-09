import React from "react";
import styled from "styled-components";

const StyledOption = styled.div`
  color: var(--color-white);
  margin: 1.5rem 0;

  & > h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  & > p {
    font-size: 1.5rem;
    text-indent: 2.5rem;
  }
`;

const CardOption = ({ children, name }) => {
  return (
    <StyledOption>
      <h2>{name}</h2>
      <p>{children}</p>
    </StyledOption>
  );
};

export default CardOption;
