import React from 'react';

type ButtonPropsType = {
    title: string
    onClick?: () => void
    disable?: boolean
}
export const Button = ({title, onClick}: ButtonPropsType) => {
    return (
            <button onClick={onClick} >{title}</button>
    );
};