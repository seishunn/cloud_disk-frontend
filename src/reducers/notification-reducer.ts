import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    notification: {
        message: string
        isError: boolean
    }
}

const initialState: IInitialState = {
    notification: {
        message: "",
        isError: false
    }
};

export const notificationReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.notification = action.payload;
        }
    }
})

export default notificationReducer.reducer;