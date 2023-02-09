import React, {useState} from 'react';
import cl from "./PopupDisplay.module.scss";
import {useAppDispatch, useAppSelector} from "../../utils/redux";
import Form from "../auth/form/Form";
import {createDir} from "../../actions/file";
// Reducers
import {fileReducer} from "../../reducers/file-reducer";
// Actions
const {setPopupDisplay} = fileReducer.actions;

const PopupDisplay = () => {
    const dispatch = useAppDispatch();
    const display = useAppSelector(state => state.file.popupDisplay);
    const currentDir = useAppSelector(state => state.file.currentDir);
    const [value, setValue] = useState<string>("");
    const inputList = [
        {value: value, changeValue: setValue, type: "text", title: "Название папки"},
    ];

    const closePopupDisplay = () => {
        dispatch(setPopupDisplay(false));
    }
    const createDirHandle = () => {
        closePopupDisplay();
        dispatch(createDir(value, currentDir));
        setValue("");
    }

    if (!display) {
        return null
    }
    return (
        <div className={cl.popup} onClick={closePopupDisplay}>
            <div className={cl.popup_form} onClick={e => e.stopPropagation()}>
                <button className={cl.close} onClick={closePopupDisplay}>x</button>
                <Form title={"Создать папку"} inputList={inputList} buttonTitle={"Создать папку"} buttonHandle={createDirHandle}/>
            </div>
        </div>
    );
};

export default PopupDisplay;
