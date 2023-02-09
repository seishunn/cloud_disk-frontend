import React from 'react';
import cl from "./UploadFile.module.scss";
import {IUploadFile} from "../../../../reducers/upload-reducer";
// Reducers
import {uploadReducer} from "../../../../reducers/upload-reducer";
import {useAppDispatch} from "../../../../utils/redux";
// Actions
const {removeUploadFile} = uploadReducer.actions;

const UploadFile: React.FC<IUploadFile> = ({id, name, progress}) => {
    const dispatch = useAppDispatch();
    return (
        <div className={cl.uploaderFile}>
            <span className={cl.uploaderFile_title}>{name}</span>
            <span className={cl.uploaderFile_percent}>{progress}%</span>
            <span className={cl.uploaderFile_loader} style={{width: `${progress}%`}}/>
            <span className={cl.close} onClick={() => dispatch(removeUploadFile(id))}/>
        </div>
    );
};

export default React.memo(UploadFile);
