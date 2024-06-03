import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";
import SwitchButton from "../Buttons/SwitchButton";
import axios from "axios";
import { toast } from "react-toastify";

import Params from "../../params";
import SubBusinessCard from "../Cards/SubBusinessCard";
import BusinessNameInput from "../../components/Inputs/BusinessNameInput";
import PhoneInput from "../../components/Inputs/PhoneInput";
import DaysCheckboxButtons from "../../components/Buttons/DaysCheckboxButtons";
import TimePicker from "../../components/Inputs/TimePicker";
import { useNavigate } from "react-router-dom";


export default function ManageSubs(){
    
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {data, accessToken} = useSelector(state => state.authStore);

    const [hasSub,setHasSub] = useState(data.business.has_sub);
    const [changedHasSub,setChangedHasSub] = useState(false);
    const [subs,setSubs] = useState(null);
    const [name,setName] = useState("");
    const [longName,setLongName] = useState("");
    const [phone,setPhone] = useState("");
    const [content,setContent] = useState("");
    const [monday,setMonday] = useState(true);
    const [tuesday,setTuesday] = useState(true);
    const [wednesday,setWednesday] = useState(true);
    const [thursday,setThursday] = useState(true);
    const [friday,setFriday] = useState(true);
    const [saturday,setSaturday] = useState(false);
    const [sunday,setSunday] = useState(false);
    const [startTime,setStartTime] = useState("08:00");
    const [endTime,setEndTime] = useState("17:00");
    const [subsLoading, setSubsLoading] = useState(true);




    
    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleLongName = (e)=>{
        setLongName(e.target.value);
    }
    const handlePhone = (phone)=>{
        setPhone(phone);
    }
    const handleContent = (e) =>{
        setContent(e.target.value);
    }

    const handleChangeHasSub = (e)=>{
        if(data.business.has_sub !== e.target.checked){
            setChangedHasSub(true);
        }
        else{
            setChangedHasSub(false);
        }
        setHasSub(e.target.checked)
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

    
    const handleSubmitHasSub = async () =>{

        axios.post(Params.api+"/api/business/change-hassub", {
            "has_sub":hasSub
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("changes saved"), {
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
    const handleRemoveSub = async (sub) =>{

        axios.post(Params.api+"/api/business/remove-subbusiness", {
            "id" : sub._id
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("Sub-business removed"), {
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

    const handleAddSubmit = async (val) =>{
        if(!name || name == ""){
            toast.error(t('sub-business name required'), {
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

        axios.post(Params.api+"/api/business/add-subbusiness", {
            "name": name,
            "long_name": longName !== "" ? longName: null,
            "phone" : phone !== "" ? phone: null,
            "content": content !== "" ? content: null,
            "working_days":{
                "monday": monday,
                "tuesday": tuesday,
                "wednesday": wednesday,
                "thursday": thursday,
                "friday": friday,
                "saturday": saturday,
                "sunday": sunday
            },
            "working_hours":{
                "start" : startTime,
                "end" : endTime,
                "appointment_duration" : data.business.working_hours.appointment_duration,
                "break_time" : data.business.working_hours.break_time
            }
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("Sub-business added"), {
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

    

    const checkSub = () =>{
        if(hasSub){
            setHasSub(true);
            axios.post(Params.api+"/api/business/get-subbusiness",{
                business_id : data.business._id
            })
            .then(({data})=>{
                if(data.status == "success"){
                    setSubs(data.data.subBusinessess);
                    setSubsLoading(false);
                }else{
                    console.log(data.message)
                    setSubsLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error.response.data.message);
                setSubsLoading(false);
            }); 

        }
    }

    useEffect(()=>{
        checkSub();
    },[])

    return(
        
        <div className="msSection accountSection font-josefin-500">
            <h2>{t('Manage Subs')}</h2>
            <div className="subSwitch">
                <SwitchButton checked={hasSub} label={t('Work Sub-businesses')} onChange={handleChangeHasSub}/>
                <div className="subSwitchDesc">
                    {
                        hasSub ?
                        <p>
                            {t('hasSub==true desc')}
                        </p>
                        :
                        
                        <p>
                            {t('hasSub==false desc')}
                        </p>

                    }
                </div>
                {
                    changedHasSub &&
                    <div className="saveChanges" onClick={handleSubmitHasSub}>
                        {t('Save Changes')}
                    </div>
                }
            </div>
            {

                data.business.has_sub &&
                <div className="subsBox">
                    <h3 className="subsHeader"> {t('Our Sub-businesses')}: </h3>
                        {
                            !subsLoading ? 
                                (  subs && subs.length > 0)  ? 
                                    
                                    subs.map((sub,index)=>{
                                        return(
                                            <SubBusinessCard key={index} name={sub.name} handleRemoveSub={() => handleRemoveSub(sub)}/>
                                        )
                                    })
                                :
                                    <div className="notFoundSubs">
                                        {t('There is no sub-business')}
                                    </div>
                            :
                            <div className="notFoundSubs">
                                {t('Loading...')}
                            </div>
                        }
                </div>
            }
            {
                data.business.has_sub &&
                <div className="addSub">
                    <h3 className="addSubHeader"> {t('Add A New Sub-business')}: </h3>
                    
                    <div className="formBody">
                        <div className="formField">
                            <BusinessNameInput value={name} placeholder={t('Sub-business name')+"*"} onChange={handleName} autoFocus={true} theme={2}/>
                        </div>
                        <div className="formField">
                            <BusinessNameInput value={longName} placeholder={t('Sub-business long name')} onChange={handleLongName} theme={2}/>
                        </div>
                        <div className="formField">
                            <PhoneInput value={phone} placeholder={t('Sub-business phone')} onChange={handlePhone} theme={2}/>
                        </div>
                        <div className="formField contentField font-josefin-500">
                            <span className="head">{t('content')}:</span>
                            <textarea className="content" value={content} placeholder={t('Sub-business content')} onChange={handleContent}/>
                        </div>
                        <div className="formField daysCheckboxCont">
                            <DaysCheckboxButtons title={t('choose your working days')+"*"} days={{monday,tuesday,wednesday,thursday,friday,saturday,sunday}} onChange={handleWorkDays}/>
                        </div>

                        <div className="formField timePickerCont font-josefin-500">
                            <span className="head">{t('choose your working time')+"*"}:</span>
                            <div className="body">
                                <TimePicker title={t("start")} hour={startTime.split(":")[0]} minute={startTime.split(":")[1]} onChange={handleStartTime}/>
                                <TimePicker title={t("end")} hour={endTime.split(":")[0]} minute={endTime.split(":")[1]} onChange={handleEndTime}/>
                            </div>
                        </div>

                        <div className="formEnd">
                            
                            <div className="submitButton font-josefin-500" onClick={handleAddSubmit}>
                                {t("Add")}
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}