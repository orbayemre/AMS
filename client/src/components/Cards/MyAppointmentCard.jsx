import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from "moment";
import { toast } from 'react-toastify';

import Params from "../../params"

export default function MyAppointmentCard({appointment, type}){

    const {t} = useTranslation();
    const [business,setBusiness] = useState(null);
    const [isSub,setIsSub] = useState(false);
    const [subDetail,setSubDetail] = useState(null);
    const [date,setDate] = useState(null);

    
    const getBusiness = () =>{
        console.log(appointment.business_id)
        axios.post(Params.api+"/api/business/get-business",{   
            "business_id" : appointment.business_id,
        })
        .then(({data})=>{
            if(data.status == "success"){
                console.log(data.data);
                setBusiness(data.data.business);
                if(data.type == "sub"){
                    setIsSub(true);
                    setSubDetail(data.data.subDetail)
                }
            }else{
                console.log(data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }



    useEffect(()=>{
        getBusiness()
        const startDate = moment(appointment.start_time.split(".")[0])
        setDate({
            day: appointment.date.day,
            month : startDate.format("MMMM"),
            weekDay : startDate.format("dddd"),
            start : appointment.date.start,
            end : appointment.date.end,
        })

    },[])

    if(business){
        return(
            <div className="myappointmentCard">
                <div className="cardHead">
                    <div className="date">
                        <span>
                            {date.day}
                        </span>
                        <span>
                            { t(date.month) }
                        </span>
                        <span>
                            - { t(date.weekDay) }
                        </span>
                    </div>
                    <div className="hour"> 
                        <span className="start">
                            {date.start}
                        </span> - 
                        <span className="end">
                            {date.end}
                        </span>
                    </div>
                </div>
                <div className="cardBody">
                    <div className="business">
                        <div className="name">
                            <span>{business.name.charAt(0).toUpperCase() + business.name.slice(1)}</span>
                            {
                                isSub && 
                                
                                <span>- {subDetail.name.charAt(0).toUpperCase() + subDetail.name.slice(1)}</span>

                            }
                        </div>
                        <div className="mail">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EBF2FA" className="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                            </svg>
                            <span>{business.email}</span>
                        </div>
                        <div className="phone">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className='icon' viewBox="0 0 24 24">
                                <path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z" stroke="#EBF2FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{business.phone}</span>
                        </div>
                    </div>
                    <div className="status">
                        { 
                            type == "approved" ? 
                                <div className="approved">
                                    {t('approved')}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 344.963 344.963">
                                        <g>
                                            <path d="M321.847,86.242l-40.026-23.11l-23.104-40.02h-46.213l-40.026-23.11l-40.026,23.11H86.239   l-23.11,40.026L23.11,86.242v46.213L0,172.481l23.11,40.026v46.213l40.026,23.11l23.11,40.026h46.213l40.02,23.104l40.026-23.11   h46.213l23.11-40.026l40.026-23.11v-46.213l23.11-40.026l-23.11-40.026V86.242H321.847z M156.911,243.075   c-3.216,3.216-7.453,4.779-11.671,4.72c-4.219,0.06-8.455-1.504-11.671-4.72l-50.444-50.444c-6.319-6.319-6.319-16.57,0-22.889   l13.354-13.354c6.319-6.319,16.57-6.319,22.889,0l25.872,25.872l80.344-80.35c6.319-6.319,16.57-6.319,22.889,0l13.354,13.354   c6.319,6.319,6.319,16.57,0,22.889L156.911,243.075z"/>
                                        </g>
                                    </svg>
                                </div>
                            : 
                            ( 
                                type == "pending" ? 
                                    <div className="pending">
                                        <div className="head">
                                            {t('Pending')}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                <path d="M511.9 183c-181.8 0-329.1 147.4-329.1 329.1s147.4 329.1 329.1 329.1c181.8 0 329.1-147.4 329.1-329.1S693.6 183 511.9 183z m0 585.2c-141.2 0-256-114.8-256-256s114.8-256 256-256 256 114.8 256 256-114.9 256-256 256z"/>
                                                <path d="M548.6 365.7h-73.2v161.4l120.5 120.5 51.7-51.7-99-99z"/>
                                            </svg>
                                        </div>
                                    </div>
                                : 
                                (
                                    type == "rejected" ? 
                                        <div className="rejected">
                                            {t('rejected')}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"/>
                                            </svg>
                                        </div>
                                    : ""
                                )
                            )

                        }
                    </div>
                </div>
            </div>
        )
    }
}