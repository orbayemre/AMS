import { configureStore } from '@reduxjs/toolkit'
import authStoreReducer from "./authStore";
import businessStoreReducer from "./businessStore";


export default configureStore({
    reducer: {
        authStore : authStoreReducer,
        businessStore : businessStoreReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
