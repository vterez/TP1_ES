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
import { PageBg, ItemWrapper } from "../components/Layout.styles";
import { encode } from "../shared/utils/encodeUrl";
import { AuthContext } from "../shared/context/AuthContext";
import { Loading } from "../components/Loading";
import { BtnWrapper } from "../components/BtnWrapper";

const AddDiscWarning = styled.div`
  color: red;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const FormAtividade = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { ativId } = useParams();
  const [pathState, setPathState] = useState(() => {
    const pad = (date) => {
      return date.toString().padStart(2, "0");
    };

    const toISODate = (date) => {
      return (
        date.getFullYear() +
        "-" +
        pad(dateObj.getMonth() + 1) +
        "-" +
        pad(dateObj.getDate())
      );
    };

    const dateObj = new Date();

    return {
      ativLoading: !!ativId,
      discLoadign: true,
      initialValues: {
        nome: "",
        valor: "",
        nota: "",
        data: toISODate(dateObj),
        conteudos: "",
        disciplina: "",
      },
      discList: [],
    };
  });

  useEffect(() => {
    if (ativId && pathState.ativLoading) {
      fetch(
        `https://928c-20-102-59-234.sa.ngrok.io/detalhes/atividade/${ativId}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res["sucesso"]) {
            const temp = { ...pathState.initialValues };
            for (const discKey in res["atividade"]) {
              if (
                discKey in pathState.initialValues &&
                res["atividade"][discKey] !== "null"
              ) {
                temp[discKey] = res["atividade"][discKey];
                if (discKey === "data") {
                  const dateObj = new Date(temp[discKey]);
                  temp[discKey] = dateObj.toISOString().substring(0, 10);
                }
              }
            }
            setPathState((prevState) => {
              return {
                ativLoading: false,
                discLoading: prevState.discLoadign,
                initialValues: temp,
                discList: prevState.discList,
              };
            });
          } else {
            res["erros"].forEach((val) => toast.error(val, { theme: "dark" }));

            // ativLoading recebe false independente do sucesso da resposta
            // para evitar requests em loop devido render do componente
            setPathState((prevState) => {
              return {
                ativLoading: false,
                discLoadign: prevState.discLoadign,
                initialValues: prevState.initialValues,
                discList: prevState.discList,
              };
            });
          }
        })
        .catch((err) => {
          toast.error(err.toString(), { theme: "dark" });

          // ativLoading recebe false independente do estado de erro
          // para evitar requests em loop devido render do componente
          setPathState((prevState) => {
            return {
              ativLoading: false,
              discLoadign: prevState.discLoadign,
              initialValues: prevState.initialValues,
              discList: prevState.discList,
            };
          });
        });
    }
  }, [ativId, pathState]);

  useEffect(() => {
    if (pathState.discLoadign) {
      fetch(
        `https://928c-20-102-59-234.sa.ngrok.io/lista/disciplinas/${auth.userId}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res["sucesso"]) {
            setPathState((prevState) => {
              const temp = prevState.initialValues;

              if (res["disciplinas"].length > 0)
                temp["disciplina"] = res["disciplinas"][0]["id"];

              return {
                ativLoading: prevState.ativLoading,
                discLoading: false,
                initialValues: temp,
                discList: res["disciplinas"],
              };
            });
          } else {
            res["erros"].forEach((val) => toast.error(val, { theme: "dark" }));

            // discLoading recebe false independente do sucesso da resposta
            // para evitar requests em loop devido render do componente
            setPathState((prevState) => {
              return {
                ativLoading: prevState.ativLoading,
                discLoadign: false,
                initialValues: prevState.initialValues,
                discList: prevState.discList,
              };
            });
          }
        })
        .catch((err) => {
          toast.error(err.toString(), { theme: "dark" });

          // discLoading recebe false independente do estado de erro
          // para evitar requests em loop devido render do componente
          setPathState((prevState) => {
            return {
              ativLoading: prevState.ativLoading,
              discLoadign: false,
              initialValues: prevState.initialValues,
              discList: prevState.discList,
            };
          });
        });
    }
  }, [auth, pathState]);

  return (
    <PageBg key={window.location.pathname}>
      {pathState.ativLoading || pathState.discLoadign ? (
        <Loading>{"Loading..."}</Loading>
      ) : pathState.discList.length === 0 ? (
        <ItemWrapper>
          <AddDiscWarning>
            Deve existir ao menos umas disciplina antes de cadastrar atividades!
          </AddDiscWarning>
          <Button
            color="green"
            type="submit"
            onClick={() =>
              navigate("/disciplinas/cadastrar", { replace: true })
            }
          >
            Adicionar Disciplina
          </Button>
        </ItemWrapper>
      ) : (
        <Formik
          initialValues={pathState.initialValues}
          enableReinitialize={true}
          validationSchema={Yup.object({
            nome: Yup.string()
              .max(50, "M??ximo 50 caracteres")
              .required("Obrigat??rio"),
            valor: Yup.number().typeError("Requer um n??mero"),
            nota: Yup.number().typeError("Requer um n??mero"),
            data: Yup.date().typeError("Data inv??lida"),
            conteudos: Yup.string().max(255, "M??ximo 255 caracteres"),
            disciplina: Yup.number()
              .typeError("Requer um n??mero")
              .integer("Requer um inteiro"),
          })}
          onSubmit={(values, actions) => {
            const address = ativId
              ? `atualiza/atividate/${ativId}`
              : "cadastro/atividade";
            const method = ativId ? "PATCH" : "POST";

            let dateObj;
            let data = "";
            if (values["data"] !== "") {
              dateObj = new Date(values["data"]);
              data = dateObj.toISOString();
            }

            fetch(`https://928c-20-102-59-234.sa.ngrok.io/${address}`, {
              method,
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encode({ ...values, data }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res["sucesso"]) {
                  navigate("/atividades", { replace: true });
                } else if (typeof res["erros"][0] === "object") {
                  Object.entries(res["erros"][0]).forEach(([key, val]) => {
                    actions.setFieldError(key, val[0]);
                  });
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
              <Input name="disciplina" label="Disciplina" as="select">
                {pathState.discList.map((val) => {
                  return (
                    <option value={val["id"]} key={val["id"]}>
                      {val["nome"]}
                    </option>
                  );
                })}
              </Input>
              <Input name="nome" label="Atividade" />
              <Input name="valor" label="Valor" type="number" />
              <Input name="nota" label="Nota" type="number" />
              <Input name="data" label="Data" type="date" />
              <Input name="conteudos" label="Conte??do" as="textarea" />
              <BtnWrapper>
                <Button color="green" type="submit">
                  Adicionar
                </Button>
                <Button
                  color="red"
                  type="button"
                  onClick={() => navigate("/atividades", { replace: true })}
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

export default FormAtividade;
