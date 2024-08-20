import React from 'react';
import { Button as MuiButton } from "@mui/material";

type ButtonPropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
    classes?: string
}
export const Button = ({title, onClick, disabled, classes}: ButtonPropsType) => {
    return (
            <MuiButton
                onClick={onClick}
                disabled={disabled}
                className={classes}
                variant="contained"
                color="primary"

                >
                {title}
            </MuiButton>    );
};