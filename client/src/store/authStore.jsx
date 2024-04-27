import {createSlice} from "@reduxjs/toolkit";
import useAuthStoreInitial from "../hooks/useAuthStoreInitial";
import Cookies from 'js-cookie';

export const authData = createSlice({
    name:'auth',
    initialState: await useAuthStoreInitial(),    /* initialState:{ isLogin: false, accessToken: "", userType:"", data:null }, */
    reducers:{
        setLogin: (state, action) => {
            Cookies.set('AMS_token', action.payload.data.token);
            Cookies.set('user_type', action.payload.userType);
            
            state.isLogin = true;
            state.accessToken = action.payload.data.token;
            state.userType = action.payload.userType;
            state.data = action.payload.data.data;
        },
        setLogout: (state) => {
            Cookies.remove('AMS_token');
            Cookies.remove('user_type');
            
            state.isLogin = false;
            state.accessToken = "";
            state.userType = "";
            state.data = null;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setAuthData: (state, action) => {
            state.data = action.payload;
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
    }
})

export const {setLogin, setLogout, setAccessToken, setAuthData, setUserType} = authData.actions;

export default authData.reducer;
