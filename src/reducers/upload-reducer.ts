import {createSlice} from "@reduxjs/toolkit";

export interface IUploadFile {
    id: number
    name: string
    progress: number
}

interface IInitialState {
    isVisible: boolean
    files: IUploadFile []
}

const initialState: IInitialState = {
    isVisible: false,
    files: []
};

export const uploadReducer = createSlice({
    name: "uploadReducer",
    initialState,
    reducers: {
        uploaderIsVisible(state, action) {
            state.isVisible = action.payload;
        },
        addUploadFile(state, action) {
            state.files = [...state.files, action.payload];
        },
        removeUploadFile(state, action) {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        changeUploadFile(state, action) {
            state.files = state.files.map(file => {
                if (file.id === action.payload.payload.id) {
                    return {...file, progress: action.payload.payload.progress}
                }
                return file
            })
        }
    }
})

export default uploadReducer.reducer;