import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./shared/context/AuthContext";
import Auth from "./pages/Auth";
import FormDisciplina from "./pages/FormDisciplina";
import FormAtividade from "./pages/FormAtividade";
import Disciplinas from "./pages/Disciplinas";
import Atividades from "./pages/Atividades";
import Navigation from "./shared/components/Navigation";
import GlobalStyles from "./shared/style/GlobalStyles";
import "./shared/style/CSSImports.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  //  TODO: provavelmente vai ser necessário adicionar rotas dinâmicas (:id)
  return (
    <>
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <Navigation />
          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Disciplinas />} />
              <Route path="/disciplinas" element={<Disciplinas />} />
              <Route path="/atividades" element={<Atividades />} />
              <Route path="/disciplinas/form" element={<FormDisciplina />} />
              <Route path="/atividades/form" element={<FormAtividade />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/*" element={<Navigate replace to="/auth" />} />
            </Routes>
          )}
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
