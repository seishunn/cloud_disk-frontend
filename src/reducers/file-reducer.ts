import {createSlice} from "@reduxjs/toolkit";
import {IFile} from "../components/disk/fileList/file/File";

interface IInitialState {
    files: IFile []
    currentDir: null
    popupDisplay: boolean
    dirStack: number[]
    view: "list" | "plate"
}

const initialState: IInitialState = {
    files: [],
    currentDir: null,
    popupDisplay: false,
    dirStack: [],
    view: "list"
};

export const fileReducer = createSlice({
    name: "fileReducer",
    initialState,
    reducers: {
        setFiles(state, action) {
            state.files = action.payload;
        },
        setCurrentDir(state, action) {
            state.currentDir = action.payload;
        },
        addFile(state, action) {
            state.files = [...state.files, action.payload];
        },
        setPopupDisplay(state, action) {
            state.popupDisplay = action.payload;
        },
        pushToStack(state, action) {
            state.dirStack = [...state.dirStack, action.payload];
        },
        popFromStack(state) {
            state.dirStack.pop();
        },
        deleteFileFromArray(state, action) {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        setView(state, action) {
            state.view = action.payload;
        }
    }
})

export default fileReducer.reducer;