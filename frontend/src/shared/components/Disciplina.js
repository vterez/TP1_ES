import React from "react";
import { IoClose } from "react-icons/io5";
import {
  ContSec,
  Item,
  DadoIndv,
  Tag,
  Data,
  RemoveBtn,
  AddBtn,
} from "./AtivDisc.styles";

import { useNavigate } from "react-router-dom";

//Dados pra teste
import { disciplinas } from "../../temp-data/disciplinas";

const Disciplina = () => {
  // TODO: Remover. Temporário para acesso aos formulários
  const tempNavigate = useNavigate();
  const tempCadastrar = () => {
    tempNavigate("cadastrar");
  };
  const tempEditar = () => {
    tempNavigate("/disciplinas/editar/1", { replace: true });
  };

  return (
    <ContSec>
      {disciplinas.map((disciplina) => {
        const { id, professor, disciplina_nome, horario, sala, carga_horaria } =
          disciplina;
        return (
          <>
            <Item key={id}>
              <div>
                <DadoIndv>
                  <Tag>Professor: </Tag>
                  <Data>{professor}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Disciplina: </Tag>
                  <Data>{disciplina_nome}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Horário: </Tag>
                  <Data>{horario}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Sala: </Tag>
                  <Data>{sala}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Carga Horária: </Tag>
                  <Data>{carga_horaria}</Data>
                </DadoIndv>
              </div>
              <RemoveBtn>
                {" "}
                <IoClose />{" "}
              </RemoveBtn>
            </Item>
          </>
        );
      })}
      <AddBtn>Adicionar disciplina</AddBtn>
      {/*TODO: Remover. Temporário para acesso aos formulários*/}
      <div style={{ background: "red", padding: "1rem" }}>
        <AddBtn onClick={tempCadastrar}>Temp Cadastrar</AddBtn>
        <AddBtn onClick={tempEditar}>Temp Editart</AddBtn>
      </div>
    </ContSec>
  );
};

export default Disciplina;
