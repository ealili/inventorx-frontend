import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user/userSlice.ts'
import notificationReducer from './notification/notificationSlice.ts'
import headerReducer from './header/headerSlice.ts'
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from 'redux-persist'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {GetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import logger from "redux-logger";
import {thunk} from "redux-thunk";``

const persistAuthConfig = {
    key: `${import.meta.env.VITE_AUTH_CONFIG_KEY}`,
    storage,
    whitelist: ['user', 'access_token']
}

const persistConfig = {
    key: `${import.meta.env.VITE_STORAGE_CONFIG_KEY}`,
    storage,
}

const persistedUserReducer = persistReducer(persistAuthConfig, userReducer)
// const persistedNotificationReducer = persistReducer(persistConfig, notificationReducer)
const persistedHeaderReducer = persistReducer(persistConfig, headerReducer)

export const store = configureStore({
    reducer: {
        userState: persistedUserReducer,
        notification: notificationReducer,
        header: persistedHeaderReducer,
    },
    middleware: (getDefaultMiddleware: GetDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat([thunk, logger])
})

export type AppDispatch = typeof store.dispatch;


export const persistor = persistStore(store);