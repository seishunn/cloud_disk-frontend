import React, {useState} from 'react';
import AuthForm from "../form/Form";
import {login} from "../../../actions/user";
import {useAppDispatch} from "../../../utils/redux";

const Login = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const inputList = [
        {value: email, changeValue: setEmail, type: "text", title: "Адрес эл. почты"},
        {value: password, changeValue: setPassword, type: "password", title: "Введите пароль"}
    ];

    const loginHandle = () => {
        dispatch(login(email, password));
    }

    return (
        <AuthForm
            title={"Войти"}
            inputList={inputList}
            buttonTitle={"Войти"}
            linkButtonTitle={"Создать аккаунт"}
            buttonHandle={loginHandle}
            linkButtonTo={"/auth/registration"}
        />
    );
};

export default Login;
