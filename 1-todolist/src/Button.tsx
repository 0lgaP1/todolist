import React from 'react';
import styled from "styled-components";

const StyledBtn = styled.button`
    //background-color: #a1b433;
    //color: #000000;
    //cursor: pointer;
    //border-radius: 5px;
    //gap: 8px;
    //border: 1px solid rgb(0, 0, 0);
    //box-shadow: none;
    //
    //&:hover {
    //    background-color: #436cef;
    //}
    //
    //&:disabled {
    //    background-color: #ccc;
    //}
`
type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
    classes?: string
}
export const Button = ({title, onClickHandler, disabled, classes}: ButtonPropsType) => {
    return (
            <StyledBtn
                onClick={onClickHandler}
                disabled={disabled}
                className={classes}>{title}</StyledBtn>
    );
};