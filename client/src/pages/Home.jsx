import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { setLogout }  from "../store/authStore";
import {useEffect } from "react"


export default function Home(){
    
    const {isLogin, accessToken, data, userType} = useSelector(state => state.authStore);
    const dispatch = useDispatch();
    

    useEffect(()=>{  
        console.log(isLogin, accessToken, data, userType);

    },[]); 
    return(
        <>
            <span onClick={() => dispatch(setLogout())} className="text-2xl font-bold underline bg-first p-3 m-3">
                Logout
            </span>
            <div className="m-4" >Token : {Cookies.get("AMS_token")}</div>
        </>
    )
}