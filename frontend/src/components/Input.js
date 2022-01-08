import React from "react";
import styled from "styled-components";
import { Field, ErrorMessage, useFormikContext } from "formik";

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

  & > input,
  & > textarea,
  & > select {
    appearance: none;
    font-size: 1.8rem;
    background-color: var(--color-bg-input);
    color: var(--color-white);
    outline: none;
    border: 1px solid var(--color-white);
    border-radius: 0.5rem;
    min-height: 5rem;
    max-height: 30rem;
    padding: 0 1rem;
    resize: vertical;
    ${({ $ta }) => $ta === "textarea" && "height: 15rem;"}
    ${({ $ta }) => $ta === "textarea" && "padding: 1rem;"}
  }
`;

const Input = ({ children, name, label, as, ...props }) => {
  const { handleChange } = useFormikContext();

  return (
    <StyledInput $ta={as}>
      <>
        <label htmlFor={name}>{label}</label>
        <Field
          name={name}
          id={name}
          as={as}
          onChange={(e) => {
            handleChange(e);
          }}
          {...props}
        >
          {children}
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </>
    </StyledInput>
  );
};

export default Input;
