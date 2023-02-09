import {createSlice} from "@reduxjs/toolkit";

export interface IUser {
    id: null | number
    avatar: null | string
    diskSpace: number
    email: string
    login: string
    usedSpace: number
}

interface IInitialState {
    user: IUser
    isAuth: boolean
}

const initialState: IInitialState = {
    user: {
        id: null,
        avatar: null,
        login: "",
        email: "",
        diskSpace: 0,
        usedSpace: 0
    },
    isAuth: false
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuth = true;
        },
        deleteUser(state) {
            state.user = {
                id: null,
                avatar: null,
                login: "",
                email: "",
                diskSpace: 0,
                usedSpace: 0
            };
            state.isAuth = false;
            localStorage.removeItem("token");
        }
    }
})

export default userReducer.reducer;