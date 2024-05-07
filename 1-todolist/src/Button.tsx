import React from 'react';
import styled from "styled-components";

const StyledBtn = styled.button`
    background-color: #a1b433;
    color: #000000;
    cursor: pointer;
    border-radius: 5px;
    gap: 8px;

    &:hover {
        background-color: #0056b3;
    }
`
type ButtonPropsType = {
    title: string
    onClick?: () => void
    disable?: boolean
}
export const Button = ({title, onClick}: ButtonPropsType) => {
    return (
            <StyledBtn onClick={onClick} >{title}</StyledBtn>
    );
};