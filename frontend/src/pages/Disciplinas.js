// Página para visualisar todas as disciplinas
import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PageBg, ItemWrapper } from "../components/Layout.styles";
import CardTitle from "../components/CardTitle";
import CardOption from "../components/CardOption";
import ListHeader from "../components/ListHeader";
import Button from "../components/Button";
import { AuthContext } from "../shared/context/AuthContext";

const ListContainer = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  padding-top: clamp(5rem, 8vh, 7rem);
  gap: 2rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const Loading = styled.div`
  color: var(--color-white);
  font-size: 3rem;
`;

const Disciplinas = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [listState, setListState] = useState({ isLoading: true, list: [] });

  const fetchList = useCallback(() => {
    fetch(
      `https://928c-20-102-59-234.sa.ngrok.io/lista/disciplinas/${auth.userId}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res["sucesso"]) {
          setListState({ isLoading: false, list: res["disciplinas"] });
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
      fetch(`https://928c-20-102-59-234.sa.ngrok.io/remove/disciplina/${id}`, {
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
        <ListHeader to="/disciplinas/cadastrar">Disciplinas</ListHeader>
        {listState.isLoading ? (
          <Loading>Loading...</Loading>
        ) : listState.list.length === 0 ? (
          <Loading>Vazio</Loading>
        ) : (
          listState.list.map((val, idx) => {
            return (
              <ItemWrapper key={idx}>
                <CardTitle>{val["nome"]}</CardTitle>
                {val["professor"] && (
                  <CardOption name="Professor">{val["professor"]}</CardOption>
                )}
                {val["sala"] && (
                  <CardOption name="Sala">{val["sala"]}</CardOption>
                )}
                {val["horario"] && (
                  <CardOption name="Horário">{val["horario"]}</CardOption>
                )}
                {val["carga_horaria"] && (
                  <CardOption name="Carga Horária">
                    {val["carga_horaria"]}
                  </CardOption>
                )}
                <BtnWrapper>
                  <Button
                    color="grey"
                    type="button"
                    onClick={() =>
                      navigate(`/disciplinas/editar/${val["id"]}`, {
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

export default Disciplinas;
