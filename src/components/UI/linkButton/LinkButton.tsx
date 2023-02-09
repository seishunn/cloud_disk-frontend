import React from 'react';
import cl from "./LinkButton.module.scss";
import {NavLink} from "react-router-dom";

interface ILinkButton {
    children: React.ReactNode
    to: string
}

const LinkButton: React.FC<ILinkButton> = ({children, to}) => {
    return (
        <NavLink to={to} className={cl.link}>
            {children}
        </NavLink>
    );
};

export default React.memo(LinkButton);
