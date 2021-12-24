import React from "react";
import styled from "styled-components";
import { FaExclamationCircle } from "react-icons/fa";

const Warning = styled.span`
  color: red;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin: 0.3rem 0;

  & > *:first-child {
    margin-right: 0.5em;
  }
`;

const TextError = ({ children }) => {
  return (
    <Warning>
      <FaExclamationCircle />
      {children}
    </Warning>
  );
};

export default TextError;
