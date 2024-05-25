import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from "moment";
import { toast } from 'react-toastify';

import Params from "../../params"
import AppointmentCard from "../Cards/AppointmentCard";

export default function BusinessAppointmentsSection({id,isSub}){
    
    const {t} = useTranslation();
    const {accessToken} = useSelector(state => state.authStore);

    const [activeTab,setActiveTab] = useState("all");
    const [contentLoading,setContentLoading] = useState(true);
    const [activeData,setActiveData] = useState(null);
    const [allData,setAllData] = useState(null);
    const [pendingData,setPendingData] = useState(null);
    const [approvedData,setApprovedData] = useState(null);
    const [rejectedData,setRejectedData] = useState(null);
    const [pastData,setPastData] = useState(null);
    const [order,setOrder] = useState("recent");

    const handleTabClick = (val) =>{
        if(val != activeTab){
            setContentLoading(true);
            setActiveTab(val);
        }
    }
    const handleOrder = (e) =>{
        setContentLoading(true);
        setOrder(e.target.value);
    }

    const getData = async (type,set) =>{
        const now = moment();

        await axios.post(Params.api+"/api/appointment/get-appointments-bytype",{   
            "id" : id,
            "type" : type,
            "start_date" : now.toJSON().split(".")[0]
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                set(data.appointments)
                setActiveData(data.appointments)
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
        setOrder("recent");
        if(activeTab == "all"){
            if(allData){ 
                setActiveData(allData);
                setContentLoading(false);
            }
            else{ getData(activeTab,setAllData) }
        }
        else if(activeTab == "pending"){
            if(pendingData){ 
                setActiveData(pendingData);
                setContentLoading(false);
            }
            else{ getData(activeTab,setPendingData) }
        }
        else if(activeTab == "approved"){
            if(approvedData){ 
                setActiveData(approvedData);
                setContentLoading(false);
            }
            else{ getData(activeTab,setApprovedData) }
        }
        else if(activeTab == "rejected"){
            if(rejectedData){ 
                setActiveData(rejectedData);
                setContentLoading(false);
            }
            else{ getData(activeTab,setRejectedData) }
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
        if(activeData){
            setContentLoading(false);
        }

    },[activeData])

    useEffect(()=>{
        if(activeData){
            var temp =[];
            activeData.map(d =>{
                temp.push(d)
            })
            const reverse = temp.reverse();
            setActiveData(reverse);
            setContentLoading(false);
        }
    },[order])

    return(
        <div className="baSection accountSection font-josefin-500">
            <div className="baHeader">
                <h2> {t('Manage Appointments')} </h2>
            </div>
            <div className="baBody">
                <div className="control">
                    <div className="controlTabs">
                        <div className={"tabItem allActive" + (activeTab == "all" ? " active" : "")} onClick={()=>handleTabClick("all")}>
                            {t('All')}
                        </div>
                        <div className={"tabItem pending" + (activeTab == "pending" ? " active" : "")} onClick={()=>handleTabClick("pending")}>
                            {t('Pending')}
                        </div>
                        <div className={"tabItem approved" + (activeTab == "approved" ? " active" : "")} onClick={()=>handleTabClick("approved")}>
                            {t('Approved')}
                        </div>
                        <div className={"tabItem rejected" + (activeTab == "rejected" ? " active" : "")} onClick={()=>handleTabClick("rejected")}>
                            {t('Rejected')}
                        </div>
                        <div className={"tabItem past" + (activeTab == "past" ? " active" : "")} onClick={()=>handleTabClick("past")}>
                            {t('Past')}
                        </div>
                    </div>
                    <div className="controlOrder">
                        <select className="order" onChange={(e) =>handleOrder(e)} value={order}>
                            <option value="recent">{t('recent')}</option>
                            <option value="ancient">{t('ancient')}</option>
                        </select>
                    </div>
                    
                </div>
                <div className="content">
                    {
                        contentLoading ?  <> Loading... </> :
                        activeData.map((appointment,index) =>{
                            return(
                                <AppointmentCard
                                    key={index}
                                    appointment={appointment}
                                    type={ activeTab == "past" ? "past" : appointment.status}
                                    isSub={isSub}
                                    subId={isSub ? id : null}
                                />
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    )
}