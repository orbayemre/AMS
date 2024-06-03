import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';

import Params from "../../params"
import WeekCalendar from "./WeekCalendar";
import WeekControl from "./WeekControl";
import { ToastContainer } from "react-toastify";


export default function Calendar({id, isSub, workDays, workHours, offTimes}){

    const {accessToken} = useSelector(state => state.authStore);
    const [activeWeek,setActiveWeek] = useState(1);
    const [weekLen,setWeekLen] = useState(4);
    const [weeksData,setWeeksData] = useState(null);
    const [appointments,setAppointments] = useState(null);


    const handleNext = () =>{
        if(activeWeek < weekLen){
            setActiveWeek(activeWeek+1);
        }
    }
    const handlePrevious = () =>{
        if(activeWeek > 1 ){
            setActiveWeek(activeWeek-1);
        }
    }
    const handleWeeksData = (data) =>{
        setWeeksData(data)
    } 

    const getAppointments = (startDate,endDate) =>{
        
        axios.post(Params.api+"/api/appointment/get-appointments",{
            business_id : id,
            start_date: startDate,
            end_date: endDate,
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                setAppointments(data.data.appointments)
            }else{
                console.log(data.message)
            }
        })
        .catch(function (error) {
            console.log(error.response.data.message);

        }); 
    }

    useEffect(()=>{
        if(weeksData){
            const startDate = weeksData[0].startData.toISOString().split('T')[0] + "T" + weeksData[0].startData.toTimeString().split(' ')[0];
            const endDate = weeksData[weekLen-1].endData.toISOString().split('T')[0] + "T" + weeksData[weekLen-1].endData.toTimeString().split(' ')[0];
            getAppointments(startDate,endDate);
        }
    },[weeksData]);
    return(
        <div className="calendar">
            <WeekControl 
                activeWeek={activeWeek} 
                weekLen={weekLen} 
                onNext={handleNext} 
                onPrevious={handlePrevious} 
                handleWeeksData={handleWeeksData}
            />
            <WeekCalendar 
                id={id}
                weekLen={weekLen} 
                activeWeek={activeWeek} 
                weeksData={weeksData}
                appointments={appointments}
                start={workHours.start}
                end={workHours.end}
                duration={workHours.appointment_duration}
                breakTime={workHours.break_time}
                workDays={workDays}
                offTimes={offTimes}
                isSub={isSub}
            />
            <ToastContainer className={"w-96"}/>
        </div>
    )
}



