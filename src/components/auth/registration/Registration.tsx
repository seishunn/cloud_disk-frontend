import React, {useState} from 'react';
import AuthForm from "../form/Form";
import {registration} from "../../../actions/user";
import {useAppDispatch} from "../../../utils/redux";

const Registration = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const inputList = [
        {value: email, changeValue: setEmail, type: "text", title: "Адрес эл. почты"},
        {value: login, changeValue: setLogin, type: "text", title: "Введите логин"},
        {value: password, changeValue: setPassword, type: "password", title: "Введите пароль"}
    ];

    const registrationHandle = () => {
        dispatch(registration(email, password, login));
    }

    return (
        <AuthForm
            title={"Регистрация"}
            inputList={inputList}
            buttonTitle={"Создать аккаунт"}
            linkButtonTitle={"Войти"}
            linkButtonTo={"/auth/login"}
            buttonHandle={registrationHandle}
        />
    );
};

export default React.memo(Registration);
