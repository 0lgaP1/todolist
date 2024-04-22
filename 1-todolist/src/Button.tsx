import React from 'react';

type ButtonPropsType = {
    title: string;
}
export const Button = (props: ButtonPropsType) => {
    return (
        <div>
            <button>
                <span>{props.title}</span>
            </button>
        </div>

    );
};

