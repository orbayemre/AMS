import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Params from "../params"
import MailInput from "../components/Inputs/MailInput";
import PasswordInput from "../components/Inputs/PasswordInput";
import '../styles/common.css';
import '../styles/auth.css';

export default function ResetPassword({params}){

    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useParams();

    const {isLogin} = useSelector(state => state.authStore);
    const [password,setPassword] = useState("");
    const [repassword,setRePassword] = useState("");
    const [validationMessage,setValidationMessage] = useState(null);

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleRePassword = (e)=>{
        setRePassword(e.target.value);
    }
    const handleSubmit = (e)=>{
        if( !password || password == "" ){
            setValidationMessage(t("password required"));
        }
        else if( !repassword || repassword == "" ){
            setValidationMessage(t("re-password required"));
        }
        else if( password !== repassword ){
            setValidationMessage(t("password do not match"));
        }
        else{
            setValidationMessage(null);

            const userType = location.pathname.split("/")[1]
            if(userType == "user"){
                axios.post(Params.api+"/api/user/reset-password/"+token,{
                    password,
                })
                .then(({data})=>{
                    if(data.status == "success"){
                        toast.success(t(data.message), {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        setTimeout(() => {
                            navigate("/user/login");
                        }, 1500);
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
            else if(userType == "business"){
                axios.post(Params.api+"/api/business/reset-password/"+token,{
                    password,
                })
                .then(({data})=>{
                    if(data.status == "success"){
                        
                        toast.success(t(data.message), {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        setTimeout(() => {
                            navigate("/business/login");
                        }, 1500);
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
    }

    useEffect(()=>{  
        if(isLogin){
            navigate("/");
        }
    },[]); 

    return(
        <div className="container resetPasswordContainer">
            <div className="resetPasswordBox"> 
                <div className="header font-josefin-500">
                    <h1>{t("reset password")}</h1>
                </div>
                <span className="resetMessage font-josefin-500">{t("reset password message")}</span>
                <div className="formBody">
                    <div className="formField">
                        <PasswordInput value={password} placeholder={t('password')+"*"} onChange={handlePassword}/>
                    </div>
                    <div className="formField">
                        <PasswordInput value={repassword} placeholder={t('re-password')+"*"} onChange={handleRePassword}/>
                    </div>
                    <div className="validationMessage font-josefin-500">
                        { validationMessage  }
                    </div>
                    
                    <div className="submitButton font-josefin-500" onClick={handleSubmit}>
                        {t("reset")}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
