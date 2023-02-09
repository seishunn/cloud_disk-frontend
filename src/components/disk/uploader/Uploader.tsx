import React from 'react';
import cl from "./Uploader.module.scss";
import UploadFile from "./uploaderFile/UploadFile";
import {useAppDispatch, useAppSelector} from "../../../utils/redux";
// Reducers
import {uploadReducer} from "../../../reducers/upload-reducer";
// Actions
const {uploaderIsVisible} = uploadReducer.actions;

const Uploader = () => {
    const dispatch = useAppDispatch();
    const isVisible = useAppSelector(state => state.upload.isVisible);
    const files = useAppSelector(state => state.upload.files);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={cl.uploader}>
            <div className={cl.uploader_header}>
                Загрузка {files.length} объекта...
                <span className={cl.close} onClick={() => dispatch(uploaderIsVisible(false))}/>
            </div>
            <div className={cl.uploader_list}>
                {files.map(file => <UploadFile
                    key={file.id}
                    id={file.id}
                    name={file.name}
                    progress={file.progress}
                    />
                )}
            </div>
        </div>
    );
};

export default Uploader;
