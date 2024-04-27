import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogin }  from "../store/authStore";
import { validate } from "email-validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Params from "../params"
import MailInput from "../components/Inputs/MailInput";
import PasswordInput from "../components/Inputs/PasswordInput";
import '../styles/common.css';
import '../styles/auth.css';
import Lottie from "../components/Animations/Lottie";
import ForgotPass from "../components/Modals/ForgotPass";

export default function BusinessLogin(){

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isLogin} = useSelector(state => state.authStore);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [validationMessage,setValidationMessage] = useState(null);

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit = (e)=>{
        if( !email || email == "" ){
            setValidationMessage(t("e-mail required"));
        }
        else if( !password || password == "" ){
            setValidationMessage(t("password required"));
        }
        else if(!validate(email)){
            setValidationMessage(t("e-mail is not valid"));
        }
        else{
            setValidationMessage(null);
            axios.post(Params.api+"/api/business/login",{
                email,
                password
            })
            .then(({data})=>{
                if(data.status == "success"){
                    dispatch(setLogin( {data, userType:"business"}))
                    navigate("/");
                }else{
                    toast.error(t(data.message), {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
            })
            .catch(function (error) {
                toast.error(t(error.response.data.message), {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            });    

        }
    }


    useEffect(()=>{  
        if(isLogin){
            navigate("/");
        }
    },[]); 


    return(
        <div className="container businessLoginContainer">
            <div className="userLoginInfo">
                <div className="head">
                    <Lottie link={"https://lottie.host/bba55b7b-18f5-416a-8ed3-6efd903dea5f/JSETJGthQE.json"} width={"350px"} height={"350px"} loop={true} />
                </div>
                <div className="body font-josefin-500">
                    {t("would you like to log in as your").split("{keyword}")[0]}
                    <a href="/user/login">{t("user account?")} </a>
                    {t("would you like to log in as your").split("{keyword}")[1]}
                </div>
            </div>
            <div className="businessLoginBox"> 
                <div className="header font-josefin-500">
                    <h1>{t("business login")}</h1>
                </div>
                <div className="formBody">
                    <div className="formField">
                        <MailInput value={email} placeholder={t('email')} onChange={handleEmail} autoFocus={true} theme={2}/>
                    </div>
                    <div className="formField">
                        <PasswordInput value={password} placeholder={t('password')} onChange={handlePassword} theme={2}/>
                    </div>
                    <ForgotPass userType="business"/>
                    <div className="validationMessage font-josefin-500">
                        { validationMessage  }
                    </div>
                    
                    <div className="submitButton font-josefin-500" onClick={handleSubmit}>
                        {t("login")}
                    </div>
                    <div className="needAccount font-josefin-500">
                        <a href="/business/register">
                            {t("don't have a business account")}
                        </a>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}


