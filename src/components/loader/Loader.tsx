import React from 'react';
import cl from "./Loader.module.scss"

const Loader = () => {
    return (
        <div className={cl.loader}>
            <div className={cl.loader_block}>
                <div className={cl.spinner}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    );
};

export default Loader;
