import React, {useEffect} from 'react';
import './App.css';
import Auth from "./components/auth/Auth";
import {Navigate, Route, Routes} from "react-router-dom";
import {toast, ToastContainer, ToastOptions} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {useAppDispatch, useAppSelector} from "./utils/redux";
import Main from "./components/main/Main";
import {auth} from "./actions/user";
import Profile from "./components/profile/Profile";

const options: ToastOptions = {
    position: "top-right",
    autoClose: 100,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
}

function App() {
    const dispatch = useAppDispatch();
    const notification = useAppSelector(state => state.notification.notification);
    const isAuth = useAppSelector(state => state.user.isAuth);

    useEffect(() => {
        dispatch(auth());
    }, []);


    useEffect(() => {
        if (notification.message) {
            if (notification.isError) {
                toast.error(notification.message, options);
            } else {
                toast.success(notification.message, options);
            }
        }
    }, [notification]);


    return (
        <div className="App">
            <ToastContainer/>
            <Routes>
                {!isAuth &&
                    <>
                        <Route path="/auth/*" element={<Auth/>}/>
                        <Route path="*" element={<Navigate to={"/auth"}/>}/>
                    </>
                }
                {isAuth &&
                    <>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="*" element={<Navigate to={"/"}/>}/>
                    </>
                }
            </Routes>
        </div>
    );
}

export default App;
