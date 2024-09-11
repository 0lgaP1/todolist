import React from 'react';
import {Button as MuiButton} from "@mui/material";

type ButtonPropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
    variant?: 'text' // was classes: string
    color?: 'inherit' | 'primary' | 'secondary'
}
export const Button = ({title, onClick, disabled, variant = 'text', color = 'primary'}: ButtonPropsType) => {
    return (
        <MuiButton
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            color={color}>

            {title}

        </MuiButton>);
};