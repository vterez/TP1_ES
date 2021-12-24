import React from "react";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

import TextError from "./TextError";

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  margin-bottom: 1rem;

  & > label {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & > input {
    font-size: 1.8rem;
    background-color: var(--color-bg-input);
    color: var(--color-white);
    outline: none;
    border: 1px solid var(--color-white);
    border-radius: 0.5rem;
    height: 5rem;
  }
`;

const Input = ({ name, label, ...props }) => {
  return (
    <StyledInput>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...props} />
      <ErrorMessage name={name} component={TextError} />
    </StyledInput>
  );
};

export default Input;
