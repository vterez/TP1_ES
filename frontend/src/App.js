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
  const [userId, setUserId] = useState(null);

  const login = useCallback((id) => {
    setIsLoggedIn(true);
    setUserId(id);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  //  TODO: provavelmente vai ser necessário adicionar rotas dinâmicas (:id)
  return (
    <>
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
        <BrowserRouter>
          <Navigation />
          {isLoggedIn ? (
            <Routes>
              <Route index element={<Navigate replace to="/disciplinas" />} />
              <Route path="/disciplinas" element={<Disciplinas />} />
              <Route path="/atividades" element={<Atividades />} />
              <Route
                path="/disciplinas/cadastrar"
                element={<FormDisciplina />}
              />
              <Route path="/atividades/cadastrar" element={<FormAtividade />} />
              <Route
                path="/disciplinas/editar/:discId"
                element={<FormDisciplina />}
              />
              <Route
                path="/atividades/editar/:ativId"
                element={<FormAtividade />}
              />
              <Route
                path="/*"
                element={<Navigate replace to="/disciplinas" />}
              />
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
