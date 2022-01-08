import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../shared/context/AuthContext";
import { ItemWrapper, PageBg } from "../components/Layout.styles";
import { encode } from "../shared/utils/encodeUrl";
import { Loading } from "../components/Loading";
import { BtnWrapper } from "../components/BtnWrapper";

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
    <PageBg key={window.location.pathname}>
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
            <ItemWrapper>
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
            </ItemWrapper>
          </Form>
        </Formik>
      )}
    </PageBg>
  );
};

export default FormDisciplina;
