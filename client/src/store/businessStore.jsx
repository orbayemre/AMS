import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const businessStore = createSlice({
    name:'businessStore',
    initialState:{ 
        menuSelected:  (Cookies.get('menuSelected') && Cookies.get('menuSelected') != "" ) ? Cookies.get('menuSelected') : "appointments" ,
        menuCollapsed:  (Cookies.get('menuCollapsed') && Cookies.get('menuCollapsed') != "" ) ? Cookies.get('menuCollapsed') == "true" : false ,
     }, 
    reducers:{
        setMenuSelected: (state, action) => {
            state.menuSelected = action.payload;
            Cookies.set('menuSelected', action.payload);
        },
        setMenuCollapsed: (state, action) => {
            state.menuCollapsed = action.payload == "true";
            Cookies.set('menuCollapsed', action.payload);
        },
    }
})

export const {setMenuSelected,setMenuCollapsed} = businessStore.actions;

export default businessStore.reducer;
