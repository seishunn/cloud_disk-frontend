import axios from "axios";
import {AppDispatch} from "../reducers";
//Reducers
import {notificationReducer} from "../reducers/notification-reducer";
import {userReducer} from "../reducers/user-reducer";
import {API_URL} from "../config";
//Actions
const {setMessage} = notificationReducer.actions;
const {setUser} = userReducer.actions;

const BASE_URL = API_URL + "api/";


export const registration = (email: string, password: string, login: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post(BASE_URL + `auth/registration`, {
                email,
                password,
                login
            });
            dispatch(setMessage({message: response.data.message, isError: false}));
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post(BASE_URL + `auth/login`, {
                email,
                password
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
            dispatch(setMessage({message: response.data.message, isError: false}));
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}

export const auth = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get(BASE_URL + `auth/auth`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
        } catch (err: any) {
            localStorage.removeItem("token");
        }
    }
}

export const uploadAvatar = (file: any) => {
    return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(BASE_URL + `file/avatar`, formData,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(setUser(response.data.user));
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}

export const deleteAvatar = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete(BASE_URL + `file/avatar`,{
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(setUser(response.data.user));
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}