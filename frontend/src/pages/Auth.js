import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../shared/context/AuthContext";
import { FormBg, FormWrapper } from "../components/Form.styles";
import { encode } from "../shared/utils/encodeUrl";

const Switch = styled.button`
  font-size: 1.4rem;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  color: var(--color-link);
  margin: 2rem auto 0 auto;
`;

const Auth = () => {
  const auth = useContext(AuthContext);
  const [signup, setSignup] = useState(false);

  const signupSwitch = () => {
    setSignup((prev) => !prev);
  };

  return (
    <FormBg>
      <Formik
        initialValues={{
          login: "",
          senha: "",
          email: "",
          nome: "",
        }}
        validationSchema={Yup.object({
          login: Yup.string()
            .min(5, "Usuário deve ter pelo menos 5 caracteres")
            .max(30, "Usuário deve ter no máximo 30 caracteres")
            .required("Usuário não pode estar vazio"),
          senha: Yup.string()
            .min(5, "Senha deve ter pelo menos 5 caracteres")
            .max(30, "Senha deve ter no máximo 30 caracteres")
            .required("Senha não pode estar vazio"),
          email: signup
            ? Yup.string()
                .email("Email deve ser um email válido")
                .max(50, "Email deve ter no máximo 50 caracteres")
                .required("Email não pode estar vazio")
            : Yup.string(),

          nome: signup
            ? Yup.string()
                .min(2, "Nome deve ter pelo menos 2 caracteres")
                .max(100, "Nome deve ter no máximo 100 caracteres")
                .required("Email não pode estar vazio")
            : Yup.string(),
        })}
        onSubmit={(values, actions) => {
          const address = signup ? "cadastro/usuario" : "login";
          fetch(`http://928c-20-102-59-234.sa.ngrok.io/${address}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode(values),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res["sucesso"]) {
                if (signup) {
                  setSignup(false);
                } else {
                  auth.login(res["id"]);
                }
              } else {
                if (signup) {
                  if (res["erros"][0]?.nome)
                    actions.setFieldError("nome", res["erros"][0]["nome"][0]);
                  if (res["erros"][0]?.senha)
                    actions.setFieldError("senha", res["erros"][0]["senha"][0]);
                  if (res["erros"][0]?.login)
                    actions.setFieldError("login", res["erros"][0]["login"][0]);
                } else {
                  actions.setFieldError("login", "Usuário ou senha incorretos");
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <Form>
          <FormWrapper>
            <Input name="login" label="Usuário" />
            <Input name="senha" type="password" label="Senha" />
            {signup && (
              <>
                <Input name="email" label="Email" />
                <Input name="nome" label="Nome" />
              </>
            )}
            <Button color="green" type="submit">
              {signup ? "Cadastrar" : "Login"}
            </Button>
            <Switch type="button" onClick={signupSwitch}>
              {signup ? "Login" : "Cadastrar"}
            </Switch>
          </FormWrapper>
        </Form>
      </Formik>
    </FormBg>
  );
};

export default Auth;
