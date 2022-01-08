import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const HeaderWrapper = styled.div`
  color: var(--color-white);

  align-self: start;
  display: flex;
  align-items: center;

  & > h1 {
    font-size: 3rem;
    margin: 2rem;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  appearance: none;
  display: flex;
  padding: 0.5rem;
  border-radius: 50%;
  height: fit-content;
  cursor: pointer;
  background-color: var(--color-green);
  color: var(--color-white);

  & > svg {
    font-size: 3.5rem;
  }
`;

const ListHeader = ({ children, to }) => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <h1>{children}</h1>
      <Button type="button" onClick={() => navigate(to, { replace: true })}>
        <FaPlus />
      </Button>
    </HeaderWrapper>
  );
};

export default ListHeader;
