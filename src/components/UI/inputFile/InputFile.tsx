import React from 'react';
import cl from "./InputFile.module.scss";

interface IInputFile {
    uploadFile: any
    [propName: string]: any
}

const InputFile: React.FC<IInputFile> = ({uploadFile, ...props}) => {
    return (
        <div className={cl.load_file}>
            <label>
                Загрузить файл
                <input type="file" multiple={true} onChange={event => uploadFile(event)} {...props}/>
            </label>
        </div>
    );
};

export default InputFile;
