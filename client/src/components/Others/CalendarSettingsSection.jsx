import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

import Params from "../../params";
import DaysCheckboxButtons from "../Buttons/DaysCheckboxButtons"
import TimePicker from "../Inputs/TimePicker";

export default function CalendarSettingsSection({isSub=false,subId=null,business}){

    const {data, accessToken} = useSelector(state => state.authStore);
    const {t} = useTranslation()
    const navigate = useNavigate();
   
    const [monday,setMonday] = useState(business.working_days.monday);
    const [tuesday,setTuesday] = useState(business.working_days.tuesday);
    const [wednesday,setWednesday] = useState(business.working_days.wednesday);
    const [thursday,setThursday] = useState(business.working_days.thursday);
    const [friday,setFriday] = useState(business.working_days.friday);
    const [saturday,setSaturday] = useState(business.working_days.saturday);
    const [sunday,setSunday] = useState(business.working_days.sunday);
    const [startTime,setStartTime] = useState(business.working_hours.start);
    const [endTime,setEndTime] = useState(business.working_hours.end);
    const [duration,setDuration] = useState(parseInt(business.working_hours.appointment_duration));
    const [breakTime,setBreakTime] = useState(parseInt(business.working_hours.break_time));
    const [closeDate,setCloseDate] = useState(moment().toJSON().split("T")[0]  + "T" + (parseInt(moment().toJSON().split("T")[1].split(":")[0]) + 1).toString() + ":00")
    const [changedWD,setChangedWD] = useState(false);
    const [changedWH,setChangedWH] = useState(false);
    const [changedAT,setChangedAT] = useState(false);
    const [changedAC,setChangedAC] = useState(false);
    
    const handleWD = (val)=>{
        setChangedWD(true);
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
        setChangedWH(true);
        setStartTime(val);
    }
    const handleEndTime = (val) =>{
        setChangedWH(true);
        setEndTime(val);
    }
    
    const handleDuration = (e) =>{
        setChangedAT(true);
        setDuration(e.target.value)
    }
    const handleBreakTime = (e) =>{
        setChangedAT(true);
        setBreakTime(e.target.value)
        
    }
    const handleCloseDate = (e) =>{
        setChangedAC(true);
        setCloseDate(e.target.value)
    }


    const submitWD = () => {
        if(!isSub){
            axios.post(Params.api+"/api/business/update-account",{
                "working_days":{
                    "monday": monday,
                    "tuesday": tuesday,
                    "wednesday": wednesday,
                    "thursday": thursday,
                    "friday": friday,
                    "saturday": saturday,
                    "sunday": sunday
                },
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("working days updated"), {
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
        else{
            
            axios.post(Params.api+"/api/business/update-sub",{
                "subId" : subId,
                "working_days":{
                    "monday": monday,
                    "tuesday": tuesday,
                    "wednesday": wednesday,
                    "thursday": thursday,
                    "friday": friday,
                    "saturday": saturday,
                    "sunday": sunday
                },
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("working days updated"), {
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

    const submitWH = () => {
        if(!isSub){
            axios.post(Params.api+"/api/business/update-account", {
                "working_hours":{
                    "start": startTime,
                    "end": endTime,
                    "appointment_duration": business.working_hours.appointment_duration,
                    "break_time": business.working_hours.break_time,
                    "lunch": null,
                },
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("working hours updated"), {
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
        else{
            
            axios.post(Params.api+"/api/business/update-sub", {
                "subId" : subId,
                "working_hours":{
                    "start": startTime,
                    "end": endTime,
                    "appointment_duration": business.working_hours.appointment_duration,
                    "break_time": business.working_hours.break_time,
                    "lunch": null,
                },
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("working hours updated"), {
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

    const submitAT = () => {
        if(!isSub){
            axios.post(Params.api+"/api/business/update-account", {
                "working_hours":{
                    "start": business.working_hours.start,
                    "end": business.working_hours.end,
                    "appointment_duration": duration.toString(),
                    "break_time": breakTime.toString(),
                    "lunch": null,
                },
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("appointment time updated"), {
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
        else{
            
            axios.post(Params.api+"/api/business/update-sub", {
                "subId" : subId,
                "working_hours":{
                    "start": business.working_hours.start,
                    "end": business.working_hours.end,
                    "appointment_duration": duration.toString(),
                    "break_time": breakTime.toString(),
                    "lunch": null,
                },
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("appointment time updated"), {
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

    const submitAC = () => {
        
        var momentEndTime = moment.utc(closeDate);
        momentEndTime.add(parseInt(business.working_hours.appointment_duration), 'm');
        const endTime = momentEndTime.toJSON().split("T")[0]  + "T" + momentEndTime.toJSON().split("T")[1].split(":")[0]+ ":" + momentEndTime.toJSON().split("T")[1].split(":")[1]
        
        const startHour = closeDate.split("T")[1].split(":")[0] + ":" + closeDate.split("T")[1].split(":")[1]
        const endHour = endTime.split("T")[1].split(":")[0] + ":" + endTime.split("T")[1].split(":")[1]

        axios.post(Params.api+"/api/appointment/close", {
            "date" : {
                "day" : parseInt(closeDate.split("T")[0].split("-")[2]),
                "month" : parseInt(closeDate.split("T")[0].split("-")[1]),
                "year" : parseInt(closeDate.split("T")[0].split("-")[0]),
                "start" : startHour,
                "end" : endHour,
            },
            "start_time": closeDate,
            "end_time": endTime,
            "is_sub": isSub,
            "sub_id": isSub ? subId : null
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("selected appointment closed"), {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setChangedAC(false);
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

    useEffect(()=>{
        if(duration < 10){
            setDuration(10)
        }
    },[duration])
    useEffect(()=>{
        if(breakTime < 0){
            setBreakTime(0)
        }
    },[breakTime])
    return(
        <div className="csSection accountSection">
            <h2>{t('Calendar Settings')}</h2>
            <div className="setting workDaysSetting">
                <h3 className="settingHeader">{t("working days")}:</h3>
                <p className="settingDesc">
                    {t("Set your business's working days")}
                </p>
                <DaysCheckboxButtons title={""} days={{monday,tuesday,wednesday,thursday,friday,saturday,sunday}} onChange={handleWD}/>
                <div className="saveButtonCont">
                    {
                        changedWD && 
                        <span className="saveButton" onClick={() => submitWD()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="setting workHoursSetting">
                <h3 className="settingHeader">{t("working hours")}:</h3>
                <p className="settingDesc">
                    {t("Set your business's working days")}
                </p>
                <div className="body">
                    <TimePicker title={t("start")} hour={startTime.split(":")[0]} minute={startTime.split(":")[1]} onChange={handleStartTime}/>
                    <TimePicker title={t("end")} hour={endTime.split(":")[0]} minute={endTime.split(":")[1]} onChange={handleEndTime}/>
                </div>
                <div className="saveButtonCont">
                    {
                        changedWH && 
                        <span className="saveButton" onClick={() => submitWH()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="setting appTimeSetting">
                <h3 className="settingHeader">{t("Appointment time")}:</h3>
                <p className="settingDesc">
                    {t("Appointment time desc")}
                </p>
                <div className="body">
                    <div className="duration">
                        <label htmlFor="duration"> {t("Appointment duration")}: </label>
                        <input id="duration" type="number" value={parseInt(duration)} min={10} onChange={(e) => handleDuration(e)}/>
                    </div>
                    <div className="break">
                        <label htmlFor="break"> {t("Appointment break time duration")}: </label>
                        <input id="break" type="number" value={parseInt(breakTime)}  min={0} onChange={(e) => handleBreakTime(e)}/>
                    </div>
                </div>
                <div className="saveButtonCont">
                    {
                        changedAT && 
                        <span className="saveButton" onClick={() => submitAT()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>
            </div>
            <div className="setting closeSetting">
                <h3 className="settingHeader">{t("Appointment close")}:</h3>
                <p className="settingDesc">
                    {t("Appointment close desc")}
                </p>
                <div className="body">
                    <input
                        type="datetime-local"
                        id="closeTime"
                        name="closeTime"
                        value={closeDate}
                        onChange={(e)=>handleCloseDate(e)}
                        min={moment().toJSON().split("T")[0]  + "T" + moment().toJSON().split("T")[1].split(":")[0] + ":" + moment().toJSON().split("T")[1].split(":")[1]}
                    />
                </div>
                <div className="saveButtonCont">
                    {
                        changedAC && 
                        <span className="saveButton" onClick={() => submitAC()}>
                            {t('Save Changes')} 
                        </span>
                    }
                </div>

            </div>
        </div>
    )
}