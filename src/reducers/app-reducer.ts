import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    isFetching: boolean
}

const initialState: IInitialState = {
    isFetching: false
};

export const appReducer = createSlice({
    name: "appReducer",
    initialState,
    reducers: {
        setIsFetching (state, action) {
            state.isFetching = action.payload;
        }
    }
})

export default appReducer.reducer;