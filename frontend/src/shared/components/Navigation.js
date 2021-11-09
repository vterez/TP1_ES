import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    font-size: 2rem;
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

  background: ${({ $isLoggedIn }) =>
    $isLoggedIn ? "var(--color-red)" : "var(--color-green)"};
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navigation = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const switchAuth = () => {
    if (auth.isLoggedIn) {
      auth.logout();
    } else {
      navigate("/auth");
    }
  };

  return (
    <Header>
      {auth.isLoggedIn && <Bars />}

      <NavMenu>
        {auth.isLoggedIn && (
          <>
            <Link to="/disciplinas">Disciplinas</Link>
            <Link to="/atividades">Atividades</Link>
          </>
        )}
        <AuthBtn $isLoggedIn={auth.isLoggedIn} onClick={switchAuth}>
          {auth.isLoggedIn ? "Logout" : "Login"}
        </AuthBtn>
      </NavMenu>
    </Header>
  );
};

export default Navigation;
