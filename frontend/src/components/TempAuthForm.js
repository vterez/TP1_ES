// Só para testar as rotas
import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";

import { AuthContext } from "../shared/context/AuthContext";

const TempAuthForm = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h2>Temporário Para Teste</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        onSubmit={() => auth.login()}
      >
        <Form>
          <label htmlFor="name">Nome</label>
          <Field id="name" name="name" />
          <label htmlFor="email">Nome</label>
          <Field id="email" name="email" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default TempAuthForm;
