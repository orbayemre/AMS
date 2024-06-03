import { configureStore } from '@reduxjs/toolkit'
import authStoreReducer from "./authStore";
import businessStoreReducer from "./businessStore";
import languageStoreReducer from "./languageStore";


export default configureStore({
    reducer: {
        authStore : authStoreReducer,
        businessStore : businessStoreReducer,
        languageStore : languageStoreReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
