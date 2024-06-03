import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const languageStore = createSlice({
    name:'languageStore',
    initialState:{ 
        lang:  localStorage.getItem("i18nextLng") ,
     }, 
    reducers:{
        setLang: (state, action) => {
            state.lang = action.payload;
            localStorage.setItem("i18nextLng",action.payload)
        },
    }
})

export const {setLang} = languageStore.actions;

export default languageStore.reducer;
