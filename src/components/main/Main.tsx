import React from 'react';
import cl from "./Main.module.scss";
import Navbar from "../navbar/Navbar";
import DiskInfoBar from "../diskInfoBar/DiskInfoBar";
import Disk from "../disk/Disk";
import PopupDisplay from "../popupDisplay/PopupDisplay";

const Main = () => {
    return (
        <div className={cl.main}>
            <PopupDisplay/>
            <Navbar/>
            <DiskInfoBar/>
            <Disk/>
        </div>
    );
};

export default Main;
