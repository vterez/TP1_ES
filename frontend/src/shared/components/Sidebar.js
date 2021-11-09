import React, { useContext } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Aside = styled.aside`
  height: 100%;
  max-height: 100%;
  background-color: var(--main-color-200);
  overflow: hidden auto;
  overscroll-behavior: none;
  -ms-scroll-chaining: none;

  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  z-index: 20;

  & > div {
    display: flex;
    flex-direction: column;
  }

  &.sidebar-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  &.sidebar-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: transform ${({ timeout }) => timeout}ms,
      opacity ${({ timeout }) => timeout}ms;
  }
  &.sidebar-exit {
    transform: translateX(0);
    opacity: 1;
  }
  &.sidebar-exit-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: transform ${({ timeout }) => timeout}ms,
      opacity ${({ timeout }) => timeout}ms;
  }
`;

const Link = styled(NavLink)`
  color: var(--color-white);
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  padding: 0.3em 0.7em;
  margin-top: 2rem;

  &.active {
    background: var(--main-color-100);
  }
`;

const AuthBtn = styled.button`
  color: var(--color-white);
  border: none;
  text-decoration: none;
  text-align: center;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  align-self: center;

  font-size: 1.8rem;
  margin-top: 2rem;
  padding: 0.3em 0.7em;
  cursor: pointer;

  background: var(--color-red);
`;

const Sidebar = ({ show, timeout, closeSidebar }) => {
  const auth = useContext(AuthContext);
  return (
    <CSSTransition
      in={show}
      timeout={timeout}
      classNames="sidebar"
      mountOnEnter
      unmountOnExit
    >
      <Aside timeout={timeout}>
        <div>
          <Link to="/disciplinas" onClick={closeSidebar}>
            Disciplinas
          </Link>
          <Link to="/atividades" onClick={closeSidebar}>
            Atividades
          </Link>
          <AuthBtn
            onClick={() => {
              auth.logout();
              closeSidebar();
            }}
          >
            Logout
          </AuthBtn>
        </div>
      </Aside>
    </CSSTransition>
  );
};

export default Sidebar;
