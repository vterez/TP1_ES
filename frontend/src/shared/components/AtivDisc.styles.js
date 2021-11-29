import styled from "styled-components";

export const ContSec = styled.section`
    margin: auto;
    display: block;
    max-width: 600px;
`;

export const Item = styled.article`
    margin: auto;
    display: flex;
    margin-top: .6rem;
    margin-bottom: .6rem;
    box-shadow: 0 .4em 1em black;
    padding: 0.6rem;
    border-radius: .5rem;
    justify-content: space-between;
`;

export const DadoIndv = styled.div`
    display: block;
    margin: auto;
`;

export const Tag = styled.p`
    font-size: 1.6rem;
    font-weight: 900;
    display: inline;
`;

export const Data = styled.p`
    font-size: 1.4rem;
    display: inline;
`;

export const AddBtn = styled.button`
    margin: auto;
    display: block;
    background-color: transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    border-color: transparent;
    outline: var(--main-color-100) solid .2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 0.5rem;
    color: var(--main-color-100);
    font-size: 2rem;
    &:hover{
        background-color: var(--main-color-100);
        color: white;
        transition: all linear 0.2s;
    }
`;

export const RemoveBtn = styled.button`
    border-radius: 1rem;
    border-color: transparent;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-red);
    background-color: var(--color-bg-red);
    display: flex;
    margin-left: auto;
    margin-right: 0;
    vertical-align: middle;
    margin-top: auto;
    margin-bottom: auto;
`;
