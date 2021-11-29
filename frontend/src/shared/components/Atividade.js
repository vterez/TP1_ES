import React from 'react'
import { IoClose } from 'react-icons/io5'
import { ContSec, Item, DadoIndv, Tag, Data, RemoveBtn, AddBtn } from './AtivDisc.styles'

//Dados para teste
import { atividades } from '../../temp-data/atividades'

const Atividade = () => {
    return (
        <ContSec>
            {atividades.map((atividade) => {
                const {id, id_disciplina, atividade_avaliativa_nome, atividade_avaliativa_nota, atividade_avaliativa_data, atividade_avaliativa_nota_obtida, conteudo} = atividade
                return (
                    <>
                        <Item key={id}>
                            <div>
                                <DadoIndv> 
                                    <Tag>Nome:  </Tag> 
                                    <Data>{atividade_avaliativa_nome}</Data>
                                </DadoIndv>
                                <DadoIndv>
                                    <Tag>Valor:  </Tag> 
                                    <Data>{atividade_avaliativa_nota}</Data>
                                </DadoIndv>
                                <DadoIndv>
                                    <Tag>Data:  </Tag> 
                                    <Data>{atividade_avaliativa_data}</Data>
                                </DadoIndv>
                                <DadoIndv>
                                    <Tag>Nota obtida:  </Tag> 
                                    <Data>{atividade_avaliativa_nota_obtida}</Data>
                                </DadoIndv>
                                <DadoIndv>
                                    <Tag>Conteúdo:  </Tag> 
                                    <Data>{conteudo}</Data>
                                </DadoIndv>
                            </div>
                            <RemoveBtn> <IoClose/> </RemoveBtn>
                        </Item>
                    </>
                )
            })}
            <AddBtn>Adicionar atividade</AddBtn>
        </ContSec>
    )
}

export default Atividade
