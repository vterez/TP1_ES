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

//Dados para teste
import { atividades } from "../../temp-data/atividades";

const Atividade = () => {
  // TODO: Remover. Temporário para acesso aos formulários
  const tempNavigate = useNavigate();
  const tempCadastrar = () => {
    tempNavigate("cadastrar");
  };
  const tempEditar = () => {
    tempNavigate("/atividades/editar/1", { replace: true });
  };

  return (
    <ContSec>
      {atividades.map((atividade) => {
        const {
          id,
          id_disciplina,
          atividade_avaliativa_nome,
          atividade_avaliativa_nota,
          atividade_avaliativa_data,
          atividade_avaliativa_nota_obtida,
          conteudo,
        } = atividade;
        return (
          <>
            <Item key={id}>
              <div>
                <DadoIndv>
                  <Tag>Nome: </Tag>
                  <Data>{atividade_avaliativa_nome}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Valor: </Tag>
                  <Data>{atividade_avaliativa_nota}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Data: </Tag>
                  <Data>{atividade_avaliativa_data}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Nota obtida: </Tag>
                  <Data>{atividade_avaliativa_nota_obtida}</Data>
                </DadoIndv>
                <DadoIndv>
                  <Tag>Conteúdo: </Tag>
                  <Data>{conteudo}</Data>
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
      <AddBtn>Adicionar atividade</AddBtn>
      {/*TODO: Remover. Temporário para acesso aos formulários*/}
      <div style={{ background: "red", padding: "1rem" }}>
        <AddBtn onClick={tempCadastrar}>Temp Cadastrar</AddBtn>
        <AddBtn onClick={tempEditar}>Temp Editart</AddBtn>
      </div>
    </ContSec>
  );
};

export default Atividade;
