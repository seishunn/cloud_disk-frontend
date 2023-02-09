import React, {useEffect, useState, DragEvent} from 'react';
import cl from "./Disk.module.scss";
import FileList from "./fileList/FileList";
import {useAppDispatch, useAppSelector} from "../../utils/redux";
import {getFiles, setUsedSpace, uploadFile} from "../../actions/file";
import classNames from "classnames";
import Uploader from "./uploader/Uploader";
import Loader from "../loader/Loader";
// Reducers
import {fileReducer} from "../../reducers/file-reducer";
// Actions
const {setView} = fileReducer.actions;

const Disk = () => {
    const dispatch = useAppDispatch();
    const files = useAppSelector(state => state.file.files);
    const currentDir = useAppSelector(state => state.file.currentDir);
    const isFetching = useAppSelector(state => state.app.isFetching);
    const [dragEnter, setDragEnter] = useState<boolean>(false);
    const [sort, setSort] = useState("");

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

    const dragEnterHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }

    const dragLeaveHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer.files);
        const totalSum = files.reduce((accumulator, currentValue) => accumulator + currentValue.size, 0);
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir))
        })
        setUsedSpace(totalSum);
        setDragEnter(false);
    }

    if (isFetching) {
        return <Loader/>
    }

    return (
        <div className={cl.disk}>
            <div className={cl.disk_header}>
                <span className={cl.disk_header_title}>Диск</span>
                <div className={cl.disk_header_sorted}>
                    <select value={sort} onChange={event => setSort(event.target.value)}>
                        <option value="">Сортировка</option>
                        <option value="fileName">По имени</option>
                        <option value="fileType">По типу</option>
                        <option value="date">По дате</option>
                    </select>
                    <span onClick={() => dispatch(setView("list"))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                            d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                    </span>
                    <span onClick={() => dispatch(setView("plate"))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                            d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                    </span>
                </div>
            </div>
            <div className={classNames(
                cl.disk_main,
                {[cl.disk_main_drag]: dragEnter}
            )}
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}
                 onDrop={dropHandler}
            >
                {dragEnter && <div className={cl.disk_main_hide}>Перетащите файлы сюда</div>}
                {!dragEnter && <FileList files={files}/>}
            </div>
            <Uploader/>
        </div>
    );
};


export default Disk;
