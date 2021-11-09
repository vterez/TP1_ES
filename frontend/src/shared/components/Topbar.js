import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

const Header = styled.header`
  background: var(--main-color-200);
  min-height: clamp(5rem, 8vh, 7rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 7%;
  user-select: none;
  z-index: 10;
`;

const Bars = styled(FaBars)`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    color: var(--color-white);
    font-size: 3rem;
    cursor: pointer;
  } ;
`;

const Link = styled(NavLink)`
  color: var(--color-white);
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 3rem;
  cursor: pointer;
  padding: 0.3em 0.7em;
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

  font-size: 1.8rem;
  margin-right: 3rem;
  padding: 0.3em 0.7em;
  cursor: pointer;

  background: var(--color-red);
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Topbar = ({ openSidebar }) => {
  const auth = useContext(AuthContext);

  return (
    <Header>
      {auth.isLoggedIn && <Bars onClick={openSidebar} />}

      {auth.isLoggedIn && (
        <NavMenu>
          <Link to="/disciplinas">Disciplinas</Link>
          <Link to="/atividades">Atividades</Link>
          <AuthBtn onClick={auth.logout}>Logout</AuthBtn>
        </NavMenu>
      )}
    </Header>
  );
};

export default Topbar;
