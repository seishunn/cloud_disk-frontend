import React from 'react';
import Registration from "./registration/Registration";
import cl from "./Auth.module.scss";
import Login from "./login/Login";
import {Navigate, Route, Routes} from "react-router-dom";

const Auth = () => {
    return (
        <div className={cl.auth}>
            <Routes>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="/auth/login"/>}/>
            </Routes>
        </div>
    );
};

export default Auth;
