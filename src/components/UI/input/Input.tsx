import React from 'react';
import cl from "./Input.module.scss";
import classNames from "classnames";

export interface IInput {
    value: string
    changeValue: (str: string) => void
    type: string
    title: string
}

const Input: React.FC<IInput> = ({value, changeValue, type, title}) => {
    return (
        <div className={cl.input}>
            <input type={type} value={value} onChange={event => changeValue(event.target.value)}/>
            <div className={classNames(
                cl.input_title,
                {[cl.input_title__active]: value}
            )}>{title}</div>
        </div>
    );
};

export default React.memo(Input);
