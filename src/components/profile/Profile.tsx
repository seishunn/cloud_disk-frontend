import React from 'react';
import cl from "./Profile.module.scss";
import Button from "../UI/button/Button";
import InputFile from "../UI/inputFile/InputFile";
import {useAppDispatch, useAppSelector} from "../../utils/redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";
import {API_URL} from "../../config";
import {useNavigate} from "react-router-dom";

const userAvatar = require("../../assets/images/user.png");

const Profile = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const avatar = user.avatar ? API_URL + user.avatar : userAvatar;
    const navigate = useNavigate();

    const deleteAvatarHandler = () => {
        dispatch(deleteAvatar());
    }

    const uploadAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files;
        if (event.target.files instanceof FileList) {
            files = Array.from(event.target.files);
            dispatch(uploadAvatar(files[0]));
        }
    }

    return (
        <div className={cl.profile}>
            <Button isGhost onClick={() => navigate(-1)}>Назад</Button>
            <div className={cl.profile_block}>
                <div className={cl.profile_avatar}>
                    <img src={avatar} alt=""/>
                </div>
                <div className={cl.profile_info}>
                    <div className={cl.profile_info_block}>
                        <div className={cl.profile_info_field}><span>Email:</span> <span className={cl.info}>{user.email}</span></div>
                        <div className={cl.profile_info_field}><span>Login:</span> <span className={cl.info}>{user.login}</span></div>
                        <div className={cl.profile_info_field}><span>DiskSpace:</span> <span className={cl.info}>{user.diskSpace}</span>
                        </div>
                        <div className={cl.profile_info_field}><span>UsedSpace:</span> <span className={cl.info}>{user.usedSpace}</span>
                        </div>
                    </div>
                    <div className={cl.profile_info_buttons}>
                        <Button isError onClick={deleteAvatarHandler}>Удалить аватар</Button>
                        <InputFile accept="image/*" uploadFile={uploadAvatarHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
