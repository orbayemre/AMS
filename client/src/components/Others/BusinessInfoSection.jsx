import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import md5 from "md5";
import moment from "moment";
import { toast } from 'react-toastify';
import { useAutoAnimate } from '@formkit/auto-animate/react'

import Params from "../../params"
import MailInput from "../Inputs/MailInput";
import PhoneInput from "../Inputs/PhoneInput";
import PasswordInput from "../Inputs/PasswordInput";
import BusinessNameInput from "../Inputs/BusinessNameInput";
import AddressSelection from "../Inputs/AddressSelection";

export default function BusinessInfoSection({id,isSub}){
    
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {data, accessToken} = useSelector(state => state.authStore);
    const [animationParent] = useAutoAnimate()

    const [name,setName] = useState(data.business.name);
    const [longName,setLongName] = useState(data.business.long_name);
    const [email,setEmail] = useState(data.business.email);
    const [phone,setPhone] = useState(data.business.phone);
    const [exPassword,setExPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [reNewPassword,setReNewPassword] = useState("");
    const [content,setContent] = useState(data.business.content);
    const [city,setCity] = useState(data.business.address.city);
    const [district,setDistrict] = useState(data.business.address.district);
    const [streetAddress,setStreetAddress] = useState(data.business.address.address_text);
    const [services,setServices] = useState(data.business.services);
    const [addServiceVal,setAddServiceVal] = useState("");

    const [changedName,setChangedName] = useState(false);
    const [changedLongName,setChangedLongName] = useState(false);
    const [changedEmail,setChangedEmail] = useState(false);
    const [changedPhone,setChangedPhone] = useState(false);
    const [changedPass,setChangedPass] = useState(false);
    const [changedContent,setChangedContent] = useState(false);
    const [changedAddress,setChangedAddress] = useState(false);
    const [changedServices,setChangedServices] = useState(false);

    const [showAddInput,setShowAddInput] = useState(false);


    const handleName = (e) =>{
        setChangedName(true);
        setName(e.target.value);
    }
    const handleLongName = (e) =>{
        setChangedLongName(true);
        setLongName(e.target.value);
    }
    const handleEmail = (e) =>{
        setChangedEmail(true);
        setEmail(e.target.value);
    }
    const handlePhone = (phone) =>{
        setChangedPhone(true);
        setPhone(phone);
    }
    const handleExPass = (e) =>{
        setChangedPass(true);
        setExPassword(e.target.value);
    }
    const handleNewPass = (e) =>{
        setChangedPass(true);
        setNewPassword(e.target.value);
    }
    const handleReNewPass = (e) =>{
        setChangedPass(true);
        setReNewPassword(e.target.value);
    }
    const handleContent = (e) =>{
        setChangedContent(true);
        setContent(e.target.value);
    }
    const handleCity = (val) =>{
        setChangedAddress(true);
        setCity(val);
    }
    const handleDistrict = (val) =>{
        setChangedAddress(true);
        setDistrict(val);
    }
    const handleStreetAddress = (e) =>{
        setChangedAddress(true);
        setStreetAddress(e.target.value);
    }
    const handleAddService = () =>{
        setChangedServices(true);
        if(addServiceVal && addServiceVal != ""){
            setServices([...services,addServiceVal]);
            setAddServiceVal("");
            setShowAddInput(false);
        }
    }
    const handleRemoveService = (target) => {
        setChangedServices(true);
        const newServices = services.filter((service) => target !== service);
        setServices(newServices);
    }



    const submitName = () =>{
        if(!name || name == ""){
            toast.error(t("name required"), {
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
        else{
            axios.post(Params.api+"/api/business/update-account",{
                "name":name,
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("company name updated"), {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate(0)
                    }, 1600);
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

    const submitLongName = () =>{
        axios.post(Params.api+"/api/business/update-account",{
            "long_name":longName,
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("long name updated"), {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(0)
                }, 1600);
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

    const submitEmail = () =>{
        if(!email || email == ""){
            toast.error(t("e-mail required"), {
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
        else{
            axios.post(Params.api+"/api/business/update-account",{
                "email":email,
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("email updated"), {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate(0)
                    }, 1600);
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
    
    const submitPhone = () =>{
        if(!phone || phone == ""){
            toast.error(t("phone required"), {
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
        else{
            axios.post(Params.api+"/api/business/update-account",{
                "phone":phone,
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("phone updated"), {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate(0)
                    }, 1600);
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

    const submitPass = () =>{
        if(!exPassword || exPassword == ""){
            toast.error(t("ex password required"), {
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
        else if(!newPassword || newPassword == ""){
            toast.error(t("new password required"), {
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
        else if(newPassword !== reNewPassword){
            toast.error(t("password do not match"), {
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
        else if( data.business.password !== md5(exPassword) ){
            toast.error(t("ex password is wrong"), {
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
        else{
            axios.post(Params.api+"/api/business/update-account",{
                "password":newPassword,
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("password updated"), {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate(0)
                    }, 1600);
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

    const submitContent = () =>{
        axios.post(Params.api+"/api/business/update-account",{
            "content":content,
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("content updated"), {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(0)
                }, 1600);
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
    const submitAddress = () =>{
        axios.post(Params.api+"/api/business/update-account",{
            "address":{
                "city" : city,
                "district" : district,
                "street" : data.business.address.street,
                "address_text" : streetAddress,
                "latitude" : data.business.address.latitude,
                "longitude" : data.business.address.longitude,
            }
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("content updated"), {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(0)
                }, 1600);
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
    const submitServices = () =>{
        axios.post(Params.api+"/api/business/update-account",{
            "services":services
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("services updated"), {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(0)
                }, 1600);
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


    const updateCityDistrict = () =>{
        setTimeout(() => {
            if(city){
                if(document.querySelector('.stdropdown-input input')){
                    document.querySelector('.stdropdown-input input').value = city.charAt(0).toUpperCase() + city.slice(1)
                }
            }
        }, 1);
        setTimeout(() => {
            if(district){
                if(document.querySelector('.stdropdown-input input')){
                    document.querySelectorAll('.stdropdown-input input')[1].value = district.charAt(0).toUpperCase() + district.slice(1)
                }
            }
        }, 1);
    }
    
    useEffect(() => {
        updateCityDistrict()
    });
    useEffect(()=>{
        setTimeout(() => {
            if(city){
                if(document.querySelector('.stdropdown-input input')){
                    document.querySelector('.stdropdown-input input').value = city.charAt(0).toUpperCase() + city.slice(1)
                }
            }
        }, 1000);
        setTimeout(() => {
            if(district){
                if(document.querySelector('.stdropdown-input input')){
                    document.querySelectorAll('.stdropdown-input input')[1].value = district.charAt(0).toUpperCase() + district.slice(1)
                }
            }
        }, 1000);

    },[])


    return(
        <div className="biSection accountSection font-josefin-500">
            <h2>{t('Business Information')}</h2>
            <div className="info nameInfo">
                <h3 className="infoHeader">{t("company name")}:</h3>
                <div className="infoField">
                    <BusinessNameInput value={name} placeholder={t('company name')} onChange={handleName} theme={2}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedName && 
                        <span className="saveButton" onClick={() => submitName()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="info longNameInfo">
                <h3 className="infoHeader">{t("long name")}:</h3>
                <div className="infoField">
                    <BusinessNameInput value={longName} placeholder={t('long name')} onChange={handleLongName} theme={2}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedLongName && 
                        <span className="saveButton" onClick={() => submitLongName()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="info emailInfo">
                <h3 className="infoHeader">{t("E-mail")}:</h3>
                <div className="infoField">
                    <MailInput value={email} placeholder={t('email')+"*"} onChange={handleEmail} theme={2}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedEmail && 
                        <span className="saveButton" onClick={() => submitEmail()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>

            </div>
            <div className="info phoneInfo">
                <h3 className="infoHeader">{t("Phone")}:</h3>
                <div className="infoField">
                    <PhoneInput value={phone} placeholder={t('phone')} onChange={handlePhone} theme={2}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedPhone && 
                        <span className="saveButton" onClick={() => submitPhone()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="info passwordInfo">
                <h3 className="infoHeader">{t("Password Change")}:</h3>
                <div className="infoField passField">
                    <label> {t("Ex Password")}: </label>
                    <PasswordInput value={exPassword} placeholder={t('Ex Password')+"*"} onChange={handleExPass} theme={2}/>
                </div>
                <div className="infoField passField">
                    <label> {t("New Password")}: </label>
                    <PasswordInput value={newPassword} placeholder={t('New Password')+"*"} onChange={handleNewPass} theme={2}/>
                </div>
                <div className="infoField passField">
                    <label> {t("Re New Password")}: </label>
                    <PasswordInput value={reNewPassword} placeholder={t('Re New Password')+"*"} onChange={handleReNewPass} theme={2}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedPass && 
                        <span className="saveButton" onClick={() => submitPass()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="info contentInfo">
                <h3 className="infoHeader">{t("content")}:</h3>
                <div className="infoField">
                    <textarea value={content ? content : ""} placeholder={t('content')} onChange={handleContent}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedContent && 
                        <span className="saveButton" onClick={() => submitContent()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="info addressInfo">
                <h3 className="infoHeader">{t("Address Info")}:</h3>
                <div className="infoField addressField">
                    <AddressSelection setCity={handleCity} setDistrict={handleDistrict}/>
                </div>
                <div className="infoField addressField">
                    <label> {t("street address")}: </label>
                    <textarea className="streetAddress" value={streetAddress} placeholder={t('type street address of your business')} onChange={handleStreetAddress}/>
                </div>

                <div className="saveButtonCont">
                    {
                        changedAddress && 
                        <span className="saveButton" onClick={() => submitAddress()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="info servicesInfo">
                <h3 className="infoHeader">{t("Services")}:</h3>
                <div className="services">
                    <div className="servicesList"  ref={animationParent} >
                        {
                            services.map((service,index) =>{
                                return(
                                    <div key={index} className="service">
                                        <span className="serviceText">{service}</span>
                                        <span className="remove" onClick={() => handleRemoveService(service)}>  
                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                )
                            })
                        }
                        {
                            services.length == 0 &&
                            <div className="notFoundService">
                                {t('not found services')}
                            </div>
                        }
                    </div>
                    <div className="serviceAdd"   ref={animationParent}>
                        {
                            showAddInput && 
                            <div className="addServiceInput">
                                <input value={addServiceVal} onChange={(e) => setAddServiceVal(e.target.value)}/>
                                <div>
                                    <span className="addSaveButton" onClick={() => handleAddService() }> {t('Save')}</span>
                                    <span className="addSaveButton" onClick={() => { setShowAddInput(false); setAddServiceVal("");} }> {t('Cancel')}</span>
                                </div>
                            </div>
                        }
                        {
                            !showAddInput &&
                            <div className="showAddInput" onClick={() => setShowAddInput(true)}>
                                {t('Add')}
                            </div>

                        }
                    </div>
                </div>

                <div className="saveButtonCont">
                    {
                        changedServices && 
                        <span className="saveButton" onClick={() => submitServices()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}