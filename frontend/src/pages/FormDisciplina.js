import React, { useContext, useState, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../shared/context/AuthContext";
import { FormBg, FormWrapper } from "../components/Form.styles";
import { encode } from "../shared/utils/encodeUrl";

const Loading = styled.div`
  color: ${({ $color }) => $color || "var(--color-white)"};
  font-size: 3rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormDisciplina = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { discId } = useParams();
  const defaultInitialValues = useMemo(
    () => ({
      nome: "",
      professor: "",
      sala: "",
      horario: "",
      carga_horaria: "",
    }),
    []
  );
  const [pathState, setPathState] = useState({
    isLoading: true,
    initialValues: defaultInitialValues,
  });
  const [errorMessage, setErrorMessage] = useState(false);

  useMemo(() => {
    if (discId && pathState.isLoading) {
      fetch(
        `http://928c-20-102-59-234.sa.ngrok.io/detalhes/disciplina/${discId}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res["sucesso"]) {
            const temp = { ...pathState.initialValues };
            for (const discKey in res["disciplina"]) {
              if (discKey in pathState.initialValues) {
                temp[discKey] = res["disciplina"][discKey];
              }
            }
            setPathState({ isLoading: false, initialValues: temp });
          } else {
            setErrorMessage(res["erros"][0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pathState.isLoading) {
      setPathState({
        isLoading: false,
        initialValues: defaultInitialValues,
      });
    }
  }, [discId, pathState, defaultInitialValues]);

  return (
    <FormBg key={window.location.pathname}>
      {pathState.isLoading ? (
        errorMessage ? (
          <Loading $color="var(--color-red)">{errorMessage}</Loading>
        ) : (
          <Loading>{"Loading..."}</Loading>
        )
      ) : (
        <Formik
          initialValues={pathState.initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            nome: Yup.string()
              .min(5, "Disciplina deve ter pelo menos 5 caracteres")
              .max(50, "Disciplina deve ter no máximo 50 caracteres")
              .required("Disciplina não pode estar vazio"),
            professor: Yup.string().max(
              50,
              "Professor deve ter no máximo 50 caracteres"
            ),
            sala: Yup.string().max(50, "Sala deve ter no máximo 50 caracteres"),
            horario: Yup.string().max(
              30,
              "Senha deve ter no máximo 50 caracteres"
            ),
            carga_horaria: Yup.number()
              .typeError("Carga Horária deve ser um número")
              .integer("Carga Horária deve ser um inteiro")
              .moreThan(14, "Carga Horária deve ser maior ou igual 15"),
          })}
          onSubmit={(values, actions) => {
            const address = discId
              ? `atualiza/disciplina/${discId}`
              : "cadastro/disciplina";
            const method = discId ? "PATCH" : "POST";
            const body = discId
              ? encode(values)
              : encode({ ...values, usuario: auth.userId });

            fetch(`http://928c-20-102-59-234.sa.ngrok.io/${address}`, {
              method: method,
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                if (res["sucesso"]) {
                  navigate("disciplinas", { replace: true });
                } else {
                  if (discId) {
                    if (typeof res["erros"][0] === "string")
                      setErrorMessage(res["erros"][0]);
                    else if (res["erros"][0]?.nome)
                      actions.setFieldError("nome", res["erros"][0]["nome"][0]);
                  } else {
                    if (res["erros"][0]?.nome)
                      actions.setFieldError("nome", res["erros"][0]["nome"][0]);
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <Form>
            {errorMessage && (
              <Loading $color="var(--color-red)">{errorMessage}</Loading>
            )}
            <FormWrapper>
              <Input name="nome" label="Disciplina" />
              <Input name="professor" label="Professor" />
              <Input name="sala" label="Sala" />
              <Input name="horario" label="Horário" />
              <Input
                name="carga_horaria"
                label="Carga Horária"
                type="number"
                min="15"
              />
              <BtnWrapper>
                <Button color="green" type="submit">
                  Adicionar
                </Button>
                <Button color="red" type="button">
                  Cancelar
                </Button>
              </BtnWrapper>
            </FormWrapper>
          </Form>
        </Formik>
      )}
    </FormBg>
  );
};

export default FormDisciplina;
