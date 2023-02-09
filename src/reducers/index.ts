import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user-reducer";
import fileReducer from "./file-reducer";
import notificationReducer from "./notification-reducer";
import uploadReducer from "./upload-reducer";
import appReducer from "./app-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
    notification: notificationReducer,
    upload: uploadReducer,
    app: appReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];