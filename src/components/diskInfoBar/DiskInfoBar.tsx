import React from 'react';
import cl from "./DiskInfoBar.module.scss";
import Button from "../UI/button/Button";
import {useAppDispatch, useAppSelector} from "../../utils/redux";
// Reducers
import {fileReducer} from "../../reducers/file-reducer";
import {setUsedSpace, uploadFile} from "../../actions/file";
import InputFile from "../UI/inputFile/InputFile";
// Actions
const {setPopupDisplay, setCurrentDir, popFromStack} = fileReducer.actions;

const DiskInfoBar = () => {
    const dispatch = useAppDispatch();
    const dirStack = useAppSelector(state => state.file.dirStack);
    const currentDir = useAppSelector(state => state.file.currentDir);

    function createDirHandler() {
        dispatch(setPopupDisplay(true));
    }

    function backHandler() {
        const backDir = dirStack.at(-2);
        dispatch(setCurrentDir(backDir));
        dispatch(popFromStack());
    }

    function uploadFileHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let files;

        if (event.target.files instanceof FileList) {
            files = Array.from(event.target.files);
            const totalSum = files.reduce((accumulator, currentValue) => accumulator + currentValue.size, 0);
            files.forEach(file => {
                dispatch(uploadFile(file, currentDir));
            })
            setUsedSpace(totalSum);
        }
    }

    return (
        <div className={cl.main}>
            <Button onClick={createDirHandler}>Создать папку</Button>
            <Button onClick={backHandler}>Назад</Button>
            <InputFile uploadFile={uploadFileHandler}/>
        </div>
    );
};

export default DiskInfoBar;
