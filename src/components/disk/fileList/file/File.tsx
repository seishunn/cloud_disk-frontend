import React from 'react';
import cl from "./File.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../utils/redux";
// Reducers
import {fileReducer} from "../../../../reducers/file-reducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import {sizeFormat} from "../../../../utils/sizeFormat";
// Actions
const {setCurrentDir, pushToStack} = fileReducer.actions;

const svgIcons: any = {
    dir: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
    </svg>,
    png: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M7.782 14.576c-.186 0-.312.018-.377.036v1.193c.077.018.174.023.306.023.485 0 .785-.246.785-.659 0-.371-.258-.593-.714-.593z"></path>
        <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.03 16.105c-.313.293-.774.426-1.313.426-.12 0-.229-.007-.312-.019v1.445h-.906V13.97a7.504 7.504 0 0 1 1.235-.083c.563 0 .966.107 1.235.323.258.204.432.54.432.936s-.131.731-.371.959zm4.302 1.853h-.96l-.863-1.56c-.24-.432-.504-.953-.701-1.427l-.019.006c.024.534.036 1.104.036 1.763v1.218h-.84v-4.042h1.067l.84 1.481c.24.426.479.93.659 1.385h.019a14.746 14.746 0 0 1-.078-1.685v-1.182h.84v4.043zm4.169-.186a4.512 4.512 0 0 1-1.349.228c-.737 0-1.271-.186-1.644-.546-.371-.348-.575-.875-.569-1.469.006-1.344.983-2.111 2.309-2.111.521 0 .924.103 1.121.198l-.191.731c-.222-.096-.498-.174-.941-.174-.762 0-1.338.432-1.338 1.308 0 .833.522 1.325 1.271 1.325.21 0 .378-.024.45-.061v-.846h-.624v-.713h1.505v2.13zM14 9h-1V4l5 5h-4z"></path>
    </svg>,
    jpg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.239 16.446c0 1.152-.551 1.554-1.438 1.554-.21 0-.486-.036-.665-.097l.101-.737c.127.042.289.072.469.072.384 0 .623-.174.623-.804v-2.543h.911v2.555zm3.294-.365c-.313.293-.773.426-1.313.426-.12 0-.228-.007-.312-.019v1.445h-.906v-3.988a7.528 7.528 0 0 1 1.236-.083c.563 0 .965.107 1.234.323.259.204.433.54.433.936s-.133.732-.372.96zm4.331 1.667c-.28.096-.815.228-1.349.228-.737 0-1.271-.186-1.643-.546-.371-.348-.575-.875-.57-1.469.007-1.344.983-2.111 2.309-2.111.521 0 .924.103 1.121.198l-.191.731c-.222-.096-.497-.174-.941-.174-.761 0-1.338.432-1.338 1.308 0 .833.523 1.325 1.271 1.325.211 0 .378-.024.451-.061v-.846h-.624v-.713h1.504v2.13zM14 9h-1V4l5 5h-4z"></path>
        <path
            d="M11.285 14.552c-.186 0-.312.018-.377.036v1.193c.077.018.174.023.307.023.484 0 .784-.246.784-.659 0-.372-.257-.593-.714-.593z"></path>
    </svg>,
    gif: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-2.667 15.772A4.512 4.512 0 0 1 9.984 18c-.737 0-1.271-.186-1.644-.546-.371-.348-.575-.875-.569-1.469.006-1.344.983-2.111 2.309-2.111.521 0 .924.103 1.121.198l-.191.731c-.222-.096-.498-.174-.941-.174-.762 0-1.338.432-1.338 1.308 0 .833.522 1.325 1.271 1.325.21 0 .378-.024.45-.061v-.846h-.624v-.713h1.505v2.13zm1.634.186h-.918v-4.042h.918v4.042zm3.262-3.292h-1.553v.923h1.451v.744h-1.451v1.625h-.918v-4.042h2.471v.75zM14 9h-1V4l5 5h-4z"></path>
    </svg>,
    download: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.61 5.757 9.149 3.609 9.792 2 11.82 2 14c0 2.657 2.089 4.815 4.708 4.971V19H17.99v-.003L18 19c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888zM8 12h3V9h2v3h3l-4 5-4-5z"></path>
    </svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
    </svg>,
    file: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm8 7h-1V4l5 5h-4z"></path>
    </svg>,
}

export interface IFile {
    id: number | null
    fileName: string
    fileType: string
    parentId: null | number
    path?: string
    size: number
    date: string
}

const File: React.FC<IFile> = ({id, fileName, fileType, size, parentId, path, date}) => {
    const dispatch = useAppDispatch();
    const fileSize = sizeFormat(size);
    const fileView = useAppSelector(state => state.file.view);

    const openDirHandler = () => {
        dispatch(pushToStack(id));
        dispatch(setCurrentDir(id));
    }

    const downloadClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        downloadFile(id!, fileName);
    }

    const deleteClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatch(deleteFile(id!));
    }

    if (fileView === "plate") {
        return (
            <div className={cl.file_plate} onClick={fileType === "dir" ? () => openDirHandler() : () => {
            }}>
                <span className={cl.file_plate_type}>
                    {fileType in svgIcons
                        ? svgIcons[fileType]
                        : svgIcons.file
                    }
                </span>
                <span className={cl.file_plate_title}>{fileName}</span>
                <div className={cl.plate_buttons} onClick={e => e.stopPropagation()}>
                    {fileType !== "dir" && <span onClick={downloadClickHandler}>{svgIcons.download}</span>}
                    <span onClick={deleteClickHandler}>{svgIcons.delete}</span>
                </div>
            </div>
        )
    }

    return (
        <div className={cl.file} onClick={fileType === "dir" ? () => openDirHandler() : () => {
        }}>
            <span className={cl.file_type}>
                {fileType in svgIcons
                    ? svgIcons[fileType]
                    : svgIcons.file
                }
            </span>
            <span className={cl.file_title}>{fileName}</span>
            <span className={cl.file_date}>{new Date(date).toLocaleDateString()}</span>
            <span className={cl.file_size}>{fileType !== "dir" ? fileSize : "-"}</span>
            <div className={cl.buttons} onClick={e => e.stopPropagation()}>
                {fileType !== "dir" && <span onClick={downloadClickHandler}>{svgIcons.download}</span>}
                <span onClick={deleteClickHandler}>{svgIcons.delete}</span>
            </div>
        </div>
    );
};

export default React.memo(File);
