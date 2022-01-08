import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: var(--color-white);
  font-size: 1.8rem;
  padding: 0.5em;
  outline: none;
  border: none;
  cursor: pointer;

  background-color: ${({ $color }) => $color};
`;

const Button = ({ children, color, ...props }) => {
  let bg;
  switch (color) {
    case "green":
      bg = "var(--color-green)";
      break;
    case "red":
      bg = "var(--color-red)";
      break;
    case "grey":
      bg = "var(--main-color-200)";
      break;
    default:
      bg = "revert";
  }
  return (
    <StyledButton $color={bg} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
