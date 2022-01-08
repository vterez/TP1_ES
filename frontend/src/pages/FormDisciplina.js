import React, { useContext, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../shared/context/AuthContext";
import { FormBg, FormWrapper } from "../components/Form.styles";
import { encode } from "../shared/utils/encodeUrl";

const Loading = styled.div`
  color: var(--color-white);
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
  const [pathState, setPathState] = useState({
    isLoading: !!discId,
    initialValues: {
      nome: "",
      professor: "",
      sala: "",
      horario: "",
      carga_horaria: "",
    },
  });

  useEffect(() => {
    if (discId && pathState.isLoading) {
      console.log("request");
      fetch(
        `https://928c-20-102-59-234.sa.ngrok.io/detalhes/disciplina/${discId}`
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
            res["erros"].forEach((val) => toast.error(val, { theme: "dark" }));

            // isLoading recebe false independente do sucesso da resposta
            // para evitar requests em loop devido render do componente
            setPathState((prevState) => {
              return {
                initialValues: prevState.initialValues,
                isLoading: false,
              };
            });
          }
        })
        .catch((err) => {
          toast.error(err.toString(), { theme: "dark" });

          // isLoading recebe false independente do estado de erro
          // para evitar requests em loop devido render do componente
          setPathState((prevState) => {
            return {
              initialValues: prevState.initialValues,
              isLoading: false,
            };
          });
        });
    }
  }, [discId, pathState]);

  return (
    <FormBg key={window.location.pathname}>
      {pathState.isLoading ? (
        <Loading>{"Loading..."}</Loading>
      ) : (
        <Formik
          initialValues={pathState.initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            nome: Yup.string()
              .max(50, "Máximo 50 caracteres")
              .required("Obrigatório"),
            professor: Yup.string().max(50, "Máximo 50 caracteres"),
            sala: Yup.string().max(50, "Máximo 50 caracteres"),
            horario: Yup.string().max(30, "Máximo 30 caracteres"),
            carga_horaria: Yup.number()
              .typeError("Requer um número")
              .integer("Requer um inteiro")
              .moreThan(14, "Deve ser maior ou igual 15"),
          })}
          onSubmit={(values, actions) => {
            const address = discId
              ? `atualiza/disciplina/${discId}`
              : "cadastro/disciplina";
            const method = discId ? "PATCH" : "POST";
            const body = discId
              ? encode(values)
              : encode({ ...values, usuario: auth.userId });

            fetch(`https://928c-20-102-59-234.sa.ngrok.io/${address}`, {
              method,
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body,
            })
              .then((res) => res.json())
              .then((res) => {
                if (res["sucesso"]) {
                  navigate("/disciplinas", { replace: true });
                } else {
                  if (discId) {
                    if (typeof res["erros"][0] === "string") {
                      res["erros"].forEach((val) =>
                        toast.error(val, { theme: "dark" })
                      );
                    } else if (typeof res["erros"][0] === "object") {
                      Object.entries(res["erros"][0]).forEach(([key, val]) => {
                        actions.setFieldError(key, val[0]);
                      });
                    }
                  } else {
                    if (typeof res["erros"][0] === "object")
                      Object.entries(res["erros"][0]).forEach(([key, val]) => {
                        actions.setFieldError(key, val[0]);
                      });
                  }
                }
              })
              .catch((err) => {
                toast.error(err.toString(), { theme: "dark" });
              });
          }}
        >
          <Form>
            <ToastContainer />
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
                <Button
                  color="red"
                  type="button"
                  onClick={() => navigate("/disciplinas", { replace: true })}
                >
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
