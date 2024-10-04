import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";
import { generalApi } from "./services/general_api";
import authReducer from "./features/authSlice";
import { authApi } from "./services/auth_api";
import postReducer from './features/MessagesReducer'


const presistConfig = {
    key:'root',
    storage
}

const authPresis = persistReducer(presistConfig, authReducer)
const postPresis = persistReducer(presistConfig, postReducer)

const store = configureStore({
    reducer:{
        [generalApi.reducerPath]: generalApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        auth : authPresis,
        messages:postPresis,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(generalApi.middleware)
            .concat(authApi.middleware),
        });

export const presister = persistStore(store)

export default store