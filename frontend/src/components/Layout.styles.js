import styled from "styled-components";

export const PageBg = styled.div`
  background-color: var(--main-color-400);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: clamp(5rem, 8vh, 7rem);
`;

export const ItemWrapper = styled.div`
  background-color: var(--main-color-100);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 60rem;
`;
