import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
  backdrop-filter: blur(2px);

  &.backdrop-enter {
    opacity: 0;
  }
  &.backdrop-enter-active {
    opacity: 1;
    transition: opacity ${({ timeout }) => timeout}ms;
  }
  &.backdrop-exit {
    opacity: 1;
  }
  &.backdrop-exit-active {
    opacity: 0;
    transition: opacity ${({ timeout }) => timeout}ms;
  }
`;

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={props.timeout}
      classNames="backdrop"
      mountOnEnter
      unmountOnExit
    >
      <StyledBackdrop timeout={props.timeout} onClick={props.onClick} />
    </CSSTransition>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
