import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ItemWrapper, PageBg } from "../components/Layout.styles";
import CardTitle from "../components/CardTitle";
import CardOption from "../components/CardOption";
import ListHeader from "../components/ListHeader";
import Button from "../components/Button";
import { AuthContext } from "../shared/context/AuthContext";
import { Loading } from "../components/Loading";
import { BtnWrapper } from "../components/BtnWrapper";
import { ListContainer } from "../components/ListContainer";

const Atividades = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [listState, setListState] = useState({ isLoading: true, list: [] });

  const fetchList = useCallback(() => {
    console.log("request");
    fetch(
      `https://928c-20-102-59-234.sa.ngrok.io/lista/atividades/${auth.userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res["sucesso"]) {
          const temp = res["atividades"].map((elements) => {
            const ativ = { ...elements };
            for (const key in ativ) {
              if (ativ[key] === "null") delete ativ[key];
              if (key === "data") {
                const date = new Date(ativ[key]);
                ativ[key] = date.toLocaleDateString();
              }
            }
            return ativ;
          });
          setListState({ isLoading: false, list: temp });
        } else {
          res["erros"].forEach((val) => toast.error(val, { theme: "dark" }));
          setListState({ isLoading: false, list: [] });
        }
      })
      .catch((err) => {
        toast.error(err.toString(), { theme: "dark" });
        setListState({ isLoading: false, list: [] });
      });
  }, [auth]);

  const deleteHandler = useCallback(
    (id) => {
      fetch(`https://928c-20-102-59-234.sa.ngrok.io/remove/atividade/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res["sucesso"]) {
            fetchList();
          } else {
            res["erros"].forEach((val) => toast.error(val, { theme: "dark" }));
          }
        })
        .catch((err) => {
          toast.error(err.toString(), { theme: "dark" });
        });
    },
    [fetchList]
  );

  useEffect(() => {
    if (listState.isLoading) {
      fetchList();
    }
  }, [listState, fetchList]);

  return (
    <PageBg>
      <ToastContainer />
      <ListContainer>
        <ListHeader to="/atividades/cadastrar">Atividades</ListHeader>
        {listState.isLoading ? (
          <Loading>Loading...</Loading>
        ) : listState.list.length === 0 ? (
          <Loading>Vazio</Loading>
        ) : (
          listState.list.map((val, idx) => {
            return (
              <ItemWrapper key={idx}>
                <CardTitle>{val["nome"]}</CardTitle>
                {val["valor"] && (
                  <CardOption name="Valor">{val["valor"]}</CardOption>
                )}
                {val["nota"] && (
                  <CardOption name="Nota">{val["nota"]}</CardOption>
                )}
                {val["data"] && (
                  <CardOption name="Data">{val["data"]}</CardOption>
                )}
                {val["conteudo"] && (
                  <CardOption name="Conteúdo">{val["conteudo"]}</CardOption>
                )}
                <BtnWrapper>
                  <Button
                    color="grey"
                    type="button"
                    onClick={() =>
                      navigate(`/atividades/editar/${val["id"]}`, {
                        replace: true,
                      })
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    color="red"
                    type="button"
                    onClick={() => deleteHandler(val["id"])}
                  >
                    Deletar
                  </Button>
                </BtnWrapper>
              </ItemWrapper>
            );
          })
        )}
      </ListContainer>
    </PageBg>
  );
};

export default Atividades;
