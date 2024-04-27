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
import TypeRadioButtons from "../components/Buttons/TypeRadioButtons";
import AddressSelection from "../components/Inputs/AddressSelection";
import DaysCheckboxButtons from "../components/Buttons/DaysCheckboxButtons";
import TimePicker from "../components/Inputs/TimePicker";

const defaultWorkDays = {
    monday : true,
    tuesday : true,
    wednesday : true,
    thursday : true,
    friday : true,
    saturday : false,
    sunday : false
};
export default function BusinessRegister(){

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isLogin} = useSelector(state => state.authStore);
    const [name,setName] = useState("");
    const [longName,setLongName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setRePassword] = useState("");
    const [phone,setPhone] = useState("");
    const [type,setType] = useState("hairdresser");
    const [city,setCity] = useState("");
    const [district,setDistrict] = useState("");
    const [streetAddress,setStreetAddress] = useState("");
    const [monday,setMonday] = useState(true);
    const [tuesday,setTuesday] = useState(true);
    const [wednesday,setWednesday] = useState(true);
    const [thursday,setThursday] = useState(true);
    const [friday,setFriday] = useState(true);
    const [saturday,setSaturday] = useState(false);
    const [sunday,setSunday] = useState(false);
    const [startTime,setStartTime] = useState("08:00");
    const [endTime,setEndTime] = useState("17:00");
    const [validationMessage,setValidationMessage] = useState(null);

    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleLongName = (e)=>{
        setLongName(e.target.value);
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
    const handleType = (val)=>{
        setType(val);
    }
    const handleCity = (val)=>{
        setCity(val);
    }
    const handleDistrict = (val)=>{
        setDistrict(val);
    }
    const handleStreetAddress = (e)=>{
        setStreetAddress(e.target.value)
    }
    const handleWorkDays = (val)=>{
        if(val == "monday") { 
            setMonday(!monday);
        }
        else if(val == "tuesday") { 
            setTuesday(!tuesday);
        }
        else if(val == "wednesday") { 
            setWednesday(!wednesday);
        }
        else if(val == "thursday") { 
            setThursday(!thursday);
        }
        else if(val == "friday") { 
            setFriday(!friday);
        }
        else if(val == "saturday") { 
            setSaturday(!saturday);
        }
        else if(val == "sunday") { 
            setSunday(!sunday);
        }
    }
    const handleStartTime = (val) =>{
        setStartTime(val);
    }
    const handleEndTime = (val) =>{
        setEndTime(val);
    }


    const handleSubmit = (e)=>{
        if( !email || email == "" ){
            setValidationMessage(t("e-mail required"));
        }
        else if( !name || name == "" ){
            setValidationMessage(t("company name required"));
        }
        else if( !phone || phone == "" || phone == "+90"){
            setValidationMessage(t("phone required"));
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
        else if( !type || type == "" ){
            setValidationMessage(t("business type required"));
        }
        else if( !city || city == "" ){
            setValidationMessage(t("city required"));
        }
        else if( !district || district == "" ){
            setValidationMessage(t("district required"));
        }
        else if( !startTime || startTime == "" ){
            setValidationMessage(t("working time required"));
        }
        else if( !endTime|| endTime == "" ){
            setValidationMessage(t("working time required"));
        }
        else{
            console.log({
                name,
                long_name:longName,
                phone,
                email,
                password,
                type,
                address:{city:city, district:district, address_text:streetAddress},
                working_days: {monday,tuesday,wednesday,thursday,friday,saturday,sunday},
                working_hours: {start:startTime, end:endTime}
            })


            setValidationMessage(null);
            axios.post(Params.api+"/api/business/register",{
                name,
                long_name:longName,
                phone,
                email,
                password,
                type,
                address:{city:city, district:district, address_text:streetAddress},
                working_days: {monday,tuesday,wednesday,thursday,friday,saturday,sunday},
                working_hours: {start:startTime, end:endTime}
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
        <div className="container businessRegisterContainer">
            <div className="businessRegisterBox"> 
                <div className="header font-josefin-500">
                    <Lottie link={"https://lottie.host/b1b552a8-b070-4a1a-a39e-f9dc1c7b3506/EYdlbTWOJG.json"} width={"150px"} height={"150px"} loop={true} />
                    <h1>{t("business register")}</h1>
                </div>
                
                <div className="formBody">
                    <div className="formField">
                        <NameInput value={name} placeholder={t('company name')+"*"} onChange={handleName} autoFocus={true} theme={2}/>
                    </div>
                    <div className="formField">
                        <NameInput value={longName} placeholder={t('long name')} onChange={handleLongName} theme={2}/>
                    </div>
                    <div className="formField">
                        <MailInput value={email} placeholder={t('email')+"*"} onChange={handleEmail} theme={2}/>
                    </div>
                    <div className="formField">
                        <PhoneInput value={phone} placeholder={t('phone')} onChange={handlePhone} theme={2}/>
                    </div>
                    <div className="formField">
                        <PasswordInput value={password} placeholder={t('password')+"*"} onChange={handlePassword} theme={2}/>
                    </div>
                    <div className="formField">
                        <PasswordInput value={repassword} placeholder={t('re-password')+"*"} onChange={handleRePassword} theme={2}/>
                    </div>
                    <div className="formField formFieldTypeRadio">
                        <TypeRadioButtons title={t('choose your business type')+"*"} value={type} onChange={handleType}/>
                    </div>
                    <div className="formField addressSelectionCont">
                        <AddressSelection setCity={handleCity} setDistrict={handleDistrict}/>
                    </div>
                    <div className="formField streetAddressCont font-josefin-500">
                        <span className="head">{t('street address')}:</span>
                        <textarea className="streetAddress" placeholder={t('type street address of your business')} onChange={handleStreetAddress}/>
                    </div>
                    <div className="formField daysCheckboxCont">
                        <DaysCheckboxButtons title={t('choose your working days')+"*"} days={{monday,tuesday,wednesday,thursday,friday,saturday,sunday}} onChange={handleWorkDays}/>
                    </div>

                    <div className="formField timePickerCont font-josefin-500">
                        <span className="head">{t('choose your working time')+"*"}:</span>
                        <div className="body">
                            <TimePicker title={t("start")} hour={startTime.split(":")[0]} minute={startTime.split(":")[1]} onChange={handleStartTime}/>
                            <TimePicker title={t("end")} hour={endTime.split(":")[0]} minute={endTime.split(":")[1]} onChange={handleStartTime}/>
                        </div>
                    </div>

                    <div className="formEnd">
                        <div className="validationMessage font-josefin-500">
                            { validationMessage  }
                        </div>
                        
                        <div className="submitButton font-josefin-500" onClick={handleSubmit}>
                            {t("register")}
                        </div>
                        <div className="alreadyAccount font-josefin-500">
                            <a href="/business/login">
                                {t("do you have already a business account")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
