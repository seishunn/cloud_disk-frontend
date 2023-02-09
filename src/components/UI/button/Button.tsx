import React from 'react';
import cl from "./Button.module.scss";
import classNames from "classnames";

interface IButtonProps {
    children: React.ReactNode
    isError?: boolean
    isGhost?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any
}

const Button: React.FC<IButtonProps> = ({children, onClick = () => {}, isGhost, isError}) => {
    return (
        <button onClick={onClick} className={classNames(
            cl.btn,
            {[cl.btn_error]: isError},
            {[cl.btn_ghost]: isGhost}
        )}>
            {children}
        </button>
    );
};

export default React.memo(Button);
