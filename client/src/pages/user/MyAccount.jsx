import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import md5 from "md5";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

import '../../styles/user.css';
import Params from "../../params";
import UserProfileImage from "../../components/Others/UserProfileImage";
import UserProfileInfo from "../../components/Others/UserProfileInfo";
import UserPassword from "../../components/Others/UserPassword";
import PhoneInput from "../../components/Inputs/PhoneInput";
import NavBar from "../../components/Others/NavBar";


export default function MyAccount(){

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isLogin, userType, accessToken, data} = useSelector(state => state.authStore);

    
    const [id, setId] = useState(data.user?._id ? data.user._id : null );
    const [name, setName] = useState(data.user?.name ? data.user.name : "" );
    const [surname, setSurname] = useState(data.user?.surname ? data.user.surname : "" );
    const [email, setEmail] = useState(data.user?.email ? data.user.email : "" );
    const [exPassword, setExPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");
    const [phone, setPhone] = useState(data.user?.phone ? data.user.phone : "" );
    const [image, setImage] = useState(data.user?.profile_image ? data.user?.profile_image : null );
    const [uploadImage, setUploadImage] = useState(null);
    const [profileChanged,setProfileChanged] = useState(false);
    const [passwordChanged,setPasswordChanged] = useState(false);
    const [phoneChanged,setPhoneChanged] = useState(false);

    const handleName = (e) =>{
        setProfileChanged(true);
        setName(e.target.value)
    } 
    const handleSurname = (e) =>{
        setProfileChanged(true);
        setSurname(e.target.value)
    } 
    const handleEmail = (e) =>{
        setProfileChanged(true);
        setEmail(e.target.value)
    } 
    const handleExPassword = (e) =>{
        setPasswordChanged(true);
        setExPassword(e.target.value)
    } 
    const handleNewPassword = (e) =>{
        setPasswordChanged(true);
        setNewPassword(e.target.value)
    } 
    const handleReNewPassword = (e) =>{
        setPasswordChanged(true);
        setReNewPassword(e.target.value)
    } 
    const handlePhone = (phone) =>{
        setPhoneChanged(true);
        setPhone(phone)
    } 


    const handleProfileSubmit = async () => {
        
        if( !email || email == "" ){
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
        else if( !name || name == "" ){
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
            setValidationMessage(t("name required"));
        }
        else if( !surname || surname == "" ){
            toast.error(t("surname required"), {
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
            
            axios.post(Params.api+"/api/user/update-account",{
                name,
                surname,
                email
            },{
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    if(uploadImage){
                        const formData = new FormData();
                        formData.append('image', uploadImage);
                
                        axios.post(Params.api+`/api/user/upload/${id}`, formData, {
                            headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${accessToken}`
                            }
                        })
                        .then(({data})=>{
                            if(data.status == "success"){
                                toast.success(t("image upload and changes saved"), {
                                    position: "bottom-center",
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                setTimeout(() => {
                                    navigate(0)
                                }, 1200);
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
                    else{
                        toast.success(t("changes saved"), {
                            position: "bottom-center",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            navigate(0)
                        }, 1200);

                    }



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
                if(error.response){
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
                }
                else{
                    toast.error(t(error), {
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
            });    
        }



    

    };
    const handleSubmitPassword = async () =>{ 
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
        else if( data.user.password !== md5(exPassword) ){
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
            axios.post(Params.api+"/api/user/update-account",{
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
    const handleSubmitPhone = async () =>{
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
            axios.post(Params.api+"/api/user/update-account",{
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


    useEffect(()=>{
        if(uploadImage){
            console.log("change");
            setProfileChanged(true);
        }
    },[uploadImage]);
    
    useEffect(()=>{
        if(!isLogin || userType != "user"){
            navigate("/");
        }
    },[]);
    useEffect(()=>{
        setTimeout(() => {
            setPhoneChanged(false)
        }, 100);
    },[]);


    return(
        <>
            <NavBar/>
            <div className="myAccount font-josefin-500">
                <h1 className="header">{t('My Account')}</h1>
                <h2 className="infoHeader" >{t('My profile information')} </h2>
                <div className="profile">
                    <UserProfileImage image={image} handleUploadImage={setUploadImage}/>
                    <UserProfileInfo name={name} surname={surname} email={email} handleName={handleName} handleSurname={handleSurname} handleEmail={handleEmail}/>
                </div>
                {
                    profileChanged && 
                    <div className="saveChangesProfile" onClick={handleProfileSubmit}>{t('Save Changes')}</div>
                }
                <div className="others">
                    <div className="passwordBox">
                        <UserPassword exPassword={exPassword} newPassword={newPassword} reNewPassword={reNewPassword} handleExPassword={handleExPassword} handleNewPassword={handleNewPassword} handleReNewPassword={handleReNewPassword}/>
                        {
                        passwordChanged && 
                        <span className="saveChangesPass" onClick={() => handleSubmitPassword()}>
                            {t('Save Changes')} 
                        </span>
                        }

                    </div>
                    <div className="phoneBox">
                        <h3 className="infoHeader">{t("Phone")}:</h3>
                        <div className="infoField">
                            <PhoneInput value={phone ? phone :""} placeholder={t('phone')} onChange={handlePhone} theme={2}/>
                        </div>
                        {
                        phoneChanged && 
                        <span className="saveChangesPhone" onClick={() => handleSubmitPhone()}>
                            {t('Save Changes')} 
                        </span>
                        }

                    </div>

                </div>
                <ToastContainer/>
            </div>
        </>
    )
}