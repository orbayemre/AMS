import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Params from "../../params"
import Calendar from "../../components/Calendar";
import '../../styles/business.css';
import '../../styles/common.css';


export default function BusinessDetail(){

    
    const navigate = useNavigate();
    const {bId} = useParams();

    const {isLogin, userType} = useSelector(state => state.authStore);
    const [business,setBusiness] = useState(null);
    const [hasSub,setHasSub] = useState(false);
    const [subs,setSubs] = useState(null);
    const [loading,setLoading] = useState(true);



    const getBusiness = () =>{
        axios.post(Params.api+"/api/business/get-business",{
            business_id : bId
        })
        .then(({data})=>{
            if(data.status == "success"){
                setBusiness(data.data.business);
            }else{
                console.log(data.message)
            }
        })
        .catch(function (error) {
            console.log(error.response.data.message);
            navigate("/");
            // Bunun yerine işletme bulunamadı sayfasına (404) yönlendirebilir.

        });    
    }

    const checkSub = () =>{
        if(business.has_sub){
            setHasSub(true);
            axios.post(Params.api+"/api/business/get-subbusiness",{
                business_id : bId
            })
            .then(({data})=>{
                if(data.status == "success"){
                    setSubs(data.data.subBusinessess);
                }else{
                    console.log(data.message)
                }
            })
            .catch(function (error) {
                console.log(error.response.data.message);
                navigate("/");
                // Bunun yerine işletme bulunamadı sayfasına (404) yönlendirebilir.
    
            }); 
        }
        else{
            setSubs(false);
        }
    }

    useEffect(()=>{
        if(!isLogin || userType != "user"){
            navigate("/");
        }
        else{
            getBusiness();
        }
    },[]);

    useEffect(()=>{
        if(business){
            checkSub();
        }
    },[business]);
    useEffect(()=>{
        if(subs !== null){
            setLoading(false);
        }
    },[subs]);


    if(loading){
        return(
            <div className="container">
                Loading...
            </div>
        )
    }
    return(
        <div className="container">


            { 
                !hasSub ?  
                    <Calendar
                        id = {bId}  
                        isSub = {false}
                        workDays = {business.working_days.days}
                        workHours = {business.working_hours}
                        offTimes = {business.special_off_times}
                    /> 
                :
                    subs.map((sub) =>{
                        return( 
                            <div key={sub._id}>
                                <Calendar
                                    id = {sub._id}  
                                    isSub = {true}
                                    workDays = {sub.working_days.days}
                                    workHours = {sub.working_hours}
                                    offTimes = {sub.special_off_times}
                                /> 
                            </div>
                        )
                    })
                
            }
        </div>
    )
}