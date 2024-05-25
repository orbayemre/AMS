
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from "moment";
import { toast } from 'react-toastify';
import '../../styles/user.css';

import Params from "../../params";
import MyAppointmentCard from "../../components/Cards/MyAppointmentCard";

export default function MyAppointments({isSub}){
    
    const {t} = useTranslation();
    const {isLogin, userType, accessToken} = useSelector(state => state.authStore);

    const [activeTab,setActiveTab] = useState("upcoming");
    const [contentLoading,setContentLoading] = useState(true);
    const [activeData,setActiveData] = useState(null);
    const [upcomingData,setUpcomingData] = useState(null);
    const [pastData,setPastData] = useState(null);

    const handleTabClick = (val) =>{
        if(val != activeTab){
            setContentLoading(true);
            setActiveTab(val);
        }
    }

    const getData = async (type,set) =>{
        const now = moment();

        await axios.get(Params.api+"/api/appointment/get-myappointments?type="+type+"&startDate="+ now.toJSON().split(".")[0],{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                set(data.data.appointments)
                setActiveData(data.data.appointments)
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
        setContentLoading(true);
        if(activeTab == "upcoming"){
            if(upcomingData){ 
                setActiveData(upcomingData);
                setContentLoading(false);
            }
            else{ getData(activeTab,setUpcomingData) }
        }
        else if(activeTab == "past"){
            if(pastData){ 
                setActiveData(pastData);
                setContentLoading(false);
            }
            else{ getData(activeTab,setPastData) }
        }
    },[activeTab])

    useEffect(()=>{
        console.log(activeData)
        if(activeData){
            setContentLoading(false);
        }

    },[activeData])




    

    useEffect(()=>{
        if(!isLogin || userType != "user"){
            navigate("/");
        }
    },[]);

    return(
        <div className="myappointments font-josefin-500">
            <div className="myappointmentsHeader">
                <h1> {t('My Appointments')} </h1>
            </div>
            <div className="myappointmentsBody">
                <div className="control">
                    <div className="controlTabs">
                        <div className={"tabItem upcoming" + (activeTab == "upcoming" ? " active" : "")} onClick={()=>handleTabClick("upcoming")}>
                            {t('Upcoming appointments')}
                        </div>
                        <div className={"tabItem past" + (activeTab == "past" ? " active" : "")} onClick={()=>handleTabClick("past")}>
                            {t('Past appointments')}
                        </div>
                    </div>
                    
                </div>
                <div className="content">
                    {
                        contentLoading ?  <> Loading... </> :
                        activeData.map((appointment,index) =>{
                            return(
                                <MyAppointmentCard
                                    key={index}
                                    appointment={appointment}
                                    type={ activeTab == "past" ? "past" : appointment.status}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}