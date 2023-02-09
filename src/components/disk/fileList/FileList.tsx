import React from 'react';
import cl from "./FileList.module.scss";
import File, {IFile} from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useAppSelector} from "../../../utils/redux";

interface IFileListProps {
    files: IFile []
}

const FileList: React.FC<IFileListProps> = ({files}) => {
    const fileView = useAppSelector(state => state.file.view);

    if (fileView === "plate") {
        return <div className={cl.fileList_plate}>
            {files.map(f =>
                    <File
                        key={f.id}
                        id={f.id}
                        fileName={f.fileName}
                        fileType={f.fileType}
                        parentId={f.parentId}
                        path={f.path}
                        size={f.size}
                        date={f.date}
                    />
            )}
        </div>
    }

    return (
        <div className={cl.fileList}>
            <div className={cl.fileList_header}>
                <span>Тип</span>
                <span>Имя</span>
                <span>Дата</span>
                <span>Размер</span>
            </div>
            <div className={cl.fileList_list}>
                {!files.length
                    ? <div className={cl.fileList_empty}>
                        <span>
                            Репозиторий пуст
                        </span>
                    </div>
                    :
                    <TransitionGroup>
                        {files.map(f =>
                            <CSSTransition
                                key={f.id}
                                timeout={500}
                                classNames={{
                                    enterActive: cl.file_enter_active
                                }}
                                exit={false}
                            >
                                <File
                                    key={f.id}
                                    id={f.id}
                                    fileName={f.fileName}
                                    fileType={f.fileType}
                                    parentId={f.parentId}
                                    path={f.path}
                                    size={f.size}
                                    date={f.date}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                }
            </div>
        </div>
    );
};

export default React.memo(FileList);
