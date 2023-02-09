import axios from "axios";
import {AppDispatch} from "../reducers";
// Reducers
import {uploadReducer} from "../reducers/upload-reducer";
import {appReducer} from "../reducers/app-reducer";
import {fileReducer} from "../reducers/file-reducer";
import {notificationReducer} from "../reducers/notification-reducer";
import {API_URL} from "../config";
// Actions
const {uploaderIsVisible, addUploadFile, changeUploadFile} = uploadReducer.actions;
const {setFiles, addFile, deleteFileFromArray} = fileReducer.actions;
const {setMessage} = notificationReducer.actions;
const {setIsFetching} = appReducer.actions;

const BASE_URL =  API_URL + "api/";

export const getFiles = (parent_id: null | number = null, sort?: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFetching(true));
            const response = await axios.get(BASE_URL + `file?parent_id=${parent_id}&sort=${sort}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(setFiles(response.data.files))
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        } finally {
            dispatch(setIsFetching(false));
        }
    }
}
export const createDir = (fileName: string, parent_id: null | number = null) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post(BASE_URL + `file`, {
                fileName,
                fileType: "dir",
                parent_id
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            dispatch(addFile(response.data.file))
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}
export const uploadFile = (file: any, parent_id: null | number = null) => {
    return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            if (parent_id) {
                formData.append("parent_id", String(parent_id));
            }

            const id = Date.now();
            const uploadFile = {name: file.name, progress: 0, id};
            dispatch(uploaderIsVisible(true));
            dispatch(addUploadFile(uploadFile));

            const response = await axios.post(BASE_URL + `file/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                onUploadProgress: (progressEvent) => {
                    const total: number = progressEvent.total!;
                    let progress = Math.round((progressEvent.loaded * 100) / total);
                    dispatch(changeUploadFile(changeUploadFile({id, progress})));
                }
            });
            dispatch(addFile(response.data.file))
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}
export const setUsedSpace = async (totalSize: number) => {
    try {
        await axios.get(BASE_URL + `file/usedSpace?totalSize=${totalSize}`,{
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
    } catch (err: any) {
        console.log(err);
    }
}
export const downloadFile = async (id: number, fileName: string) => {
    const response = await fetch(BASE_URL + `file/download?file_id=${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
export const deleteFile = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.delete(BASE_URL + `file?file_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(deleteFileFromArray(id));
            dispatch(setMessage({message: response.data.message, isError: false}));
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        }
    }
}
export const searchFiles = (fileName: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsFetching(true));
            const response = await axios.get(BASE_URL + `file/search?searchQuery=${fileName}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(setFiles(response.data.files));
        } catch (err: any) {
            dispatch(setMessage({message: err.response.data.message, isError: true}));
        } finally {
            dispatch(setIsFetching(false));
        }
    }
}