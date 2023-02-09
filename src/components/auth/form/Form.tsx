import React from 'react';
import cl from "./Form.module.scss";
import Input, {IInput} from "../../UI/input/Input";
import LinkButton from "../../UI/linkButton/LinkButton";
import Button from "../../UI/button/Button";

interface IAuthFormProps {
    title: string
    inputList: IInput[]
    buttonTitle: string
    linkButtonTitle?: string
    linkButtonTo?: string
    buttonHandle?: (prop: any) => any
}

const Form: React.FC<IAuthFormProps> = ({title,
                                                inputList,
                                                buttonHandle,
                                                linkButtonTo,
                                                linkButtonTitle,
                                                buttonTitle
                                            }) => {
    return (
        <div className={cl.authForm}>
            <div className={cl.authForm_title}>{title}</div>
            <div className={cl.authForm_input_list}>
                {inputList.map(i => {
                    return <Input
                        key={i.title}
                        value={i.value}
                        changeValue={i.changeValue}
                        type={i.type}
                        title={i.title}
                    />
                })}
            </div>
            <div className={cl.authForm_buttons}>
                {linkButtonTitle && <LinkButton to={linkButtonTo!}>{linkButtonTitle}</LinkButton>}
                <Button onClick={buttonHandle}>{buttonTitle}</Button>
            </div>
        </div>
    );
};

export default Form;
