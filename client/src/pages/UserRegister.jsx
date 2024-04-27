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
import NameInput from "../components/Inputs/NameInput";
import PhoneInput from "../components/Inputs/PhoneInput";

export default function UserRegister(){

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isLogin} = useSelector(state => state.authStore);
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setRePassword] = useState("");
    const [phone,setPhone] = useState("");
    const [validationMessage,setValidationMessage] = useState(null);

    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleSurname = (e)=>{
        setSurname(e.target.value);
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePhone = (phone)=>{
        setPhone(phone);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleRePassword = (e)=>{
        setRePassword(e.target.value);
    }
    const handleSubmit = (e)=>{
        
        if( !email || email == "" ){
            setValidationMessage(t("e-mail required"));
        }
        else if( !name || name == "" ){
            setValidationMessage(t("name required"));
        }
        else if( !surname || surname == "" ){
            setValidationMessage(t("surname required"));
        }
        else if( !password || password == "" ){
            setValidationMessage(t("password required"));
        }
        else if( !repassword || repassword == "" ){
            setValidationMessage(t("re-password required"));
        }
        else if(!validate(email)){
            setValidationMessage(t("e-mail is not valid"));
        }
        else if( password !== repassword ){
            setValidationMessage(t("password do not match"));
        }
        else{
            setValidationMessage(null);
            axios.post(Params.api+"/api/user/register",{
                name,
                surname,
                email,
                password,
                phone
            })
            .then(({data})=>{
                if(data.status == "success"){
                    dispatch(setLogin( {data, userType:"user"}))
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
        <div className="container userRegisterContainer">
            <div className="userRegisterBox"> 
                <div className="header font-josefin-500">
                    <Lottie link={"https://lottie.host/695f0bac-298f-4328-aefe-df543122364f/i4RPoZsmkp.json"} width={"150px"} height={"150px"} loop={true} />
                    <h1>{t("user register")}</h1>
                </div>
                
                <div className="formBody">
                    <div className="formField">
                        <NameInput value={name} placeholder={t('name')+"*"} onChange={handleName} autoFocus={true}/>
                    </div>
                    <div className="formField">
                        <NameInput value={surname} placeholder={t('surname')+"*"} onChange={handleSurname}/>
                    </div>
                    <div className="formField">
                        <MailInput value={email} placeholder={t('email')+"*"} onChange={handleEmail}/>
                    </div>
                    <div className="formField">
                        <PhoneInput value={phone} placeholder={t('phone')} onChange={handlePhone}/>
                    </div>
                    <div className="formField">
                        <PasswordInput value={password} placeholder={t('password')+"*"} onChange={handlePassword}/>
                    </div>
                    <div className="formField">
                        <PasswordInput value={repassword} placeholder={t('re-password')+"*"} onChange={handleRePassword}/>
                    </div>
                    <div className="formEnd">
                        <div className="validationMessage font-josefin-500">
                            { validationMessage  }
                        </div>
                        
                        <div className="submitButton font-josefin-500" onClick={handleSubmit}>
                            {t("register")}
                        </div>
                        <div className="alreadyAccount font-josefin-500">
                            <a href="/user/login">
                                {t("do you have already an account")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
