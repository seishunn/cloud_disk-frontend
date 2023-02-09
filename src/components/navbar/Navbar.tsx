import React, {useCallback, useEffect, useState} from 'react';
import cl from "./Navbar.module.scss";
import InputSearch from "../UI/inputSearch/InputSearch";
import Button from "../UI/button/Button";
import {useAppDispatch, useAppSelector} from "../../utils/redux";
import debounce from "lodash.debounce";
//Reducers
import {userReducer} from "../../reducers/user-reducer";
import {getFiles, searchFiles} from "../../actions/file";
import {API_URL} from "../../config";
import {NavLink} from "react-router-dom";
//Actions
const {deleteUser} = userReducer.actions;

const userAvatar = require("../../assets/images/user.png");

const Navbar = () => {
    const dispatch = useAppDispatch();
    const currentDir = useAppSelector(state => state.file.currentDir);
    const user = useAppSelector(state => state.user.user);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const avatar = user.avatar ? API_URL + user.avatar : userAvatar;

    const logout = () => {
        dispatch(deleteUser());
    }

    const searchFilesDebounce = useCallback(debounce((search: string) => {
        dispatch(searchFiles(search))
    }, 1000), []);

    useEffect(() => {
        if (searchQuery) {
            searchFilesDebounce(searchQuery);
        } else {
            dispatch(getFiles(currentDir));
        }
    }, [searchQuery])

    const changeValueHandle = (str: string) => {
        setSearchQuery(str);
    }

    return (
        <div className={cl.navbar}>
            <InputSearch value={searchQuery} changeValue={changeValueHandle} placeholder={'Поиск на диске'}/>
            <div className={cl.navbar_profile}>
                <Button onClick={logout} isGhost>Выйти</Button>
                <NavLink to={"/profile"}>
                    <div className={cl.avatar}>
                        <img src={avatar} alt=""/>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
