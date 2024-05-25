import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Turn as Hamburger } from 'hamburger-react'
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import Params from "../../params"
import '../../styles/business.css';
import '../../styles/common.css';
import BusinessAppointmentsSection from "../../components/Others/BusinessAppointmentsSection";
import CalendarSettingsSection from "../../components/Others/CalendarSettingsSection";
import { setMenuSelected, setMenuCollapsed }  from "../../store/businessStore";
import { setLogout }  from "../../store/authStore";
import BusinessInfoSection from "../../components/Others/BusinessInfoSection";


export default function BusinessAccount(){

    
    const navigate = useNavigate();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {isLogin, userType, data} = useSelector(state => state.authStore);
    const {menuSelected,menuCollapsed} = useSelector(state => state.businessStore);
    const [hasSub,setHasSub] = useState(false);
    const [subs,setSubs] = useState(null);
    const [loading,setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(menuCollapsed);
    const [selected, setSeleceted] = useState(menuSelected);

    const handleSelected = (val) =>{
        setSeleceted(val);
        dispatch(setMenuSelected(val))
    } 
    const handleLogout = () =>{
        dispatch(setLogout())
    }
    const handleCollapsed = (val) =>{
        setCollapsed(val);
        dispatch(setMenuCollapsed(val))
    }

    const checkSub = (business) =>{
        if(business.has_sub){
            setHasSub(true);
            axios.post(Params.api+"/api/business/get-subbusiness",{
                business_id : business._id
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
        if(!isLogin || userType != "business"){
            navigate("/");
        }else{
            checkSub(data.business);
        }
    },[]);
    
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
        <div className="container accountContainer font-josefin-500">
            <Sidebar className="sidebar"  collapsed={collapsed} transitionDuration={500}>
                <div className="hamburger">
                    <Hamburger toggled={!collapsed} toggle={() => handleCollapsed(!collapsed)} />
                </div>
                <Menu className="menu">
                    <MenuItem active={selected=="appointments"} className="menuItem" id="appointments" onClick={()=>handleSelected('appointments')}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.473 365.473">
                            <path d="M4.029,46.205V24.266c0-4.971,4.114-8.705,9.085-8.705h69.915V9c0-4.971,4.029-9,9-9s9,4.029,9,9v6.561h140V9  c0-4.971,4.029-9,9-9s9,4.029,9,9v6.561h70.27c4.971,0,8.73,3.734,8.73,8.705v21.939c0,4.971-4.029,9-9,9s-9-4.029-9-9V33.561h-61  v5.967c0,4.971-4.029,9-9,9s-9-4.029-9-9v-5.967h-140v5.967c0,4.971-4.029,9-9,9s-9-4.029-9-9v-5.967h-61v12.644  c0,4.971-4.029,9-9,9S4.029,51.176,4.029,46.205z M361.444,284.249c0,44.789-36.439,81.224-81.228,81.224  c-44.79,0-81.228-36.445-81.228-81.234c0-34.795,21.994-64.565,52.807-76.112c-1.168-1.519-1.864-3.448-1.864-5.512  c0-4.971,4.029-9.054,9-9.054h42.57c4.971,0,9,4.083,9,9.054c0,2.064-0.695,4.02-1.864,5.539c7.485,2.805,14.451,6.684,20.707,11.45  l4.445-4.445c3.515-3.515,9.214-3.513,12.728,0c3.515,3.515,3.514,9.213,0,12.728l-4.136,4.135  C354.273,246.154,361.444,264.377,361.444,284.249z M343.444,284.252c0-34.864-28.364-63.229-63.228-63.229  c-34.864,0-63.228,28.364-63.228,63.229c0,34.864,28.364,63.228,63.228,63.228C315.08,347.479,343.444,319.116,343.444,284.252z   M292.394,262.017l-3.365,3.272v-13.921c0-4.971-4.029-9-9-9s-9,4.029-9,9v35.65c0,1.225,0.338,2.392,0.781,3.456  c0.439,1.058,1.135,2.048,1.995,2.908c0.881,0.881,1.923,1.542,3.01,1.98c0.002,0.001,0.015,0.001,0.017,0.002  c0.004,0.002,0.014-0.222,0.019-0.22c0.949,0.382,1.984,0.417,3.061,0.417c0.006,0,0.011,0,0.019,0c0.095,0,0.19,0.004,0.286,0.004  s0.19-0.004,0.285-0.004c0.006,0,0.013,0,0.019,0c1.096,0,2.142-0.043,3.104-0.437c1.076-0.439,2.084-0.983,2.957-1.856  l18.636-18.58c3.515-3.515,3.467-9.185-0.047-12.7C301.654,258.473,295.909,258.502,292.394,262.017z M196.534,231.561  c0,4.971-4.029,9-9,9h-7.505v66.138c0,4.971-3.941,8.966-8.912,8.966c-0.303,0-0.514-0.05-0.809-0.078  c-0.295,0.029-0.595-0.025-0.897-0.025H13.114c-4.971,0-9.085-3.892-9.085-8.862V80.369v-0.002c0-4.971,4.114-8.806,9.085-8.806  h316.185c4.971,0,8.73,3.835,8.73,8.806v97.588c0,4.971-4.029,9-9,9s-9-4.029-9-9v-13.394h-61v0.769c0,4.971-4.029,9-9,9  s-9-4.029-9-9v-0.769h-61v58h7.505C192.505,222.561,196.534,226.59,196.534,231.561z M83.029,240.561h-61v57h61V240.561z   M83.029,164.561h-61v58h61V164.561z M162.029,240.561h-61v57h61V240.561z M162.029,164.561h-61v58h61V164.561z M180.029,109.228  v37.333h61v-37.333c0-4.971,4.029-9,9-9s9,4.029,9,9v37.333h61v-57h-298v57h61v-37.333c0-4.971,4.029-9,9-9s9,4.029,9,9v37.333h61  v-37.333c0-4.971,4.029-9,9-9S180.029,104.257,180.029,109.228z"/>
                        </svg>
                        <span>{t('Manage Appointments')} </span>
                    </MenuItem>
                    <MenuItem active={selected=="settings"} className="menuItem" id="settings" onClick={()=>handleSelected('settings')}>
                        <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 59 59">
                            <g>
                                <path d="M58.188,41.363l-1.444-0.277c-0.677-0.13-1.21-0.573-1.462-1.216c-0.253-0.642-0.163-1.329,0.245-1.885l0.907-1.236   c0.292-0.398,0.25-0.95-0.1-1.299l-1.959-1.958c-0.339-0.339-0.872-0.388-1.268-0.121l-1.217,0.824   c-0.331,0.224-0.71,0.343-1.099,0.343c-0.844,0-1.787-0.576-1.956-1.676l-0.233-1.515c-0.075-0.487-0.495-0.848-0.988-0.848h-2.77   c-0.479,0-0.892,0.341-0.982,0.812l-0.358,1.865c-0.201,1.051-1.13,1.601-1.942,1.601c-0.389,0-0.769-0.118-1.099-0.342   l-1.572-1.064c-0.397-0.267-0.929-0.218-1.268,0.121l-1.959,1.958c-0.35,0.349-0.392,0.9-0.1,1.299l0.907,1.236   c0.408,0.556,0.498,1.243,0.245,1.885c-0.252,0.643-0.785,1.086-1.462,1.216l-1.444,0.277C33.341,41.454,33,41.866,33,42.346v2.77   c0,0.493,0.36,0.913,0.848,0.988l1.515,0.233c0.683,0.105,1.232,0.528,1.508,1.16c0.276,0.633,0.212,1.323-0.175,1.895   l-0.824,1.217c-0.269,0.396-0.218,0.929,0.121,1.268l1.958,1.959c0.348,0.348,0.899,0.391,1.299,0.1l1.236-0.907   c0.342-0.252,0.742-0.385,1.156-0.385c0.813,0,1.742,0.551,1.944,1.602l0.277,1.444c0.091,0.471,0.503,0.812,0.982,0.812h2.77   c0.493,0,0.913-0.36,0.988-0.848l0.164-1.065c0.169-1.1,1.113-1.676,1.958-1.676c0.413,0,0.813,0.134,1.156,0.386l0.869,0.638   c0.4,0.292,0.951,0.249,1.299-0.1l1.958-1.959c0.339-0.339,0.39-0.871,0.121-1.268l-0.824-1.217   c-0.387-0.571-0.451-1.262-0.175-1.895c0.275-0.632,0.825-1.055,1.508-1.16l1.515-0.233C58.64,46.028,59,45.608,59,45.115v-2.77   C59,41.866,58.659,41.454,58.188,41.363z M57,44.258l-0.667,0.103c-1.354,0.208-2.489,1.082-3.036,2.337   c-0.548,1.256-0.416,2.682,0.352,3.815l0.361,0.533l-0.768,0.768l-0.177-0.13c-0.689-0.505-1.498-0.772-2.34-0.772   c-1.979,0-3.635,1.418-3.935,3.371L46.758,54.5h-1.086l-0.121-0.633c-0.359-1.868-2.004-3.225-3.909-3.225   c-0.843,0-1.651,0.268-2.34,0.771l-0.544,0.399l-0.768-0.768l0.361-0.533c0.768-1.134,0.899-2.56,0.352-3.815   c-0.547-1.255-1.683-2.129-3.036-2.337L35,44.258v-1.086l0.633-0.121c1.346-0.259,2.447-1.175,2.947-2.449   c0.5-1.275,0.315-2.695-0.494-3.8l-0.399-0.544l0.768-0.768l0.889,0.602c0.662,0.448,1.43,0.686,2.22,0.686   c1.905,0,3.548-1.355,3.907-3.224l0.202-1.054h1.086l0.103,0.667c0.301,1.953,1.955,3.371,3.934,3.371   c0.789,0,1.556-0.237,2.219-0.687l0.533-0.361l0.768,0.768l-0.399,0.544c-0.81,1.104-0.994,2.524-0.494,3.8   c0.5,1.274,1.602,2.19,2.947,2.449L57,43.172V44.258z"/>
                                <path d="M46,38.5c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S48.757,38.5,46,38.5z M46,46.5c-1.654,0-3-1.346-3-3s1.346-3,3-3   s3,1.346,3,3S47.654,46.5,46,46.5z"/>
                                <rect y="2.5" width="17" height="8"/>
                                <rect x="34" y="2.5" width="17" height="8"/>
                                <rect x="19" y="2.5" width="13" height="8"/>
                                <path d="M28.744,21.402c-1.503,0-2.782,0.528-3.837,1.583c-1.056,1.056-1.583,2.34-1.583,3.854c0,1.514,0.527,2.793,1.583,3.837   c1.055,1.044,2.34,1.565,3.854,1.565c1.514,0,2.793-0.521,3.837-1.565s1.565-2.34,1.565-3.889s-0.527-2.833-1.583-3.854   C31.526,21.913,30.247,21.402,28.744,21.402z"/>
                                <path d="M31.723,35.148l2.441-2.44v-0.914c-1.445,1.561-3.217,2.341-5.316,2.341s-3.86-0.711-5.282-2.134   c-1.423-1.423-2.134-3.149-2.134-5.18s0.711-3.756,2.134-5.179c1.422-1.423,3.148-2.134,5.179-2.134s3.757,0.711,5.18,2.134   c1.422,1.423,2.134,3.154,2.134,5.196v3.977l1.197-1.197c0.34-0.338,0.87-0.388,1.268-0.121l2.338,1.583l0.054-0.315l0.471-2.454   c0.091-0.471,0.503-0.812,0.982-0.812h7.821c0.336,0,0.629,0.175,0.812,0.437V13.5c0-0.553-0.448-1-1-1H1c-0.552,0-1,0.447-1,1v35   c0,0.553,0.448,1,1,1h29v-1c0,0,0-0.318,0-0.812v-5.529c-0.724,0.161-1.5,0.249-2.34,0.249h-0.603v-1.893h0.74   c0.784,0,1.514-0.131,2.202-0.362v-0.287c0-0.479,0.341-0.892,0.812-0.982l1.761-0.338c0.113-0.118,0.219-0.242,0.321-0.37   l-1.271-1.73C31.331,36.049,31.373,35.497,31.723,35.148z M18.058,42.578h-2V21.5L11,24.5v-2l5.058-3h2V42.578z"/>
                            </g>
                        </svg>
                        <span>{t('Calendar Settings')} </span>
                    </MenuItem>
                    <MenuItem active={selected=="info"} className="menuItem" id="info" onClick={()=>handleSelected('info')}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path d="M451.528,129.424H60.472C27.077,129.424,0,156.494,0,189.896v40.313l212.743,41.306v-3.41   c0-11.139,9.028-20.16,20.16-20.16h45.014c11.132,0,20.159,9.021,20.159,20.16v3.41L512,229.813v-39.917   C512,156.494,484.924,129.424,451.528,129.424z"/>
                                <path d="M298.076,341.563c0,11.139-9.028,20.159-20.159,20.159h-45.014c-11.132,0-20.16-9.02-20.16-20.159v-40   L0,260.258v164.25c0,33.403,27.077,60.472,60.472,60.472h391.056c33.396,0,60.472-27.069,60.472-60.472V259.854l-213.924,41.709   V341.563z"/>
                                <rect x="234.076" y="269.278" width="42.667" height="71.111"/>
                                <path d="M188.798,71.826c0.007-1.833,0.688-3.305,1.875-4.535c1.222-1.187,2.702-1.861,4.528-1.874h121.597   c1.827,0.014,3.306,0.687,4.528,1.874c1.188,1.23,1.861,2.702,1.875,4.535v32h38.396v-32c0.007-12.312-5.041-23.632-13.125-31.68   c-8.041-8.076-19.36-13.132-31.674-13.125H195.202c-12.312-0.006-23.632,5.049-31.68,13.125   c-8.077,8.049-13.132,19.368-13.119,31.68v32h38.396V71.826z"/>
                            </g>
                        </svg>
                        <span>{t('Business Information')} </span>
                    </MenuItem>
                    
                    <MenuItem className="menuItem logout" onClick={()=>handleLogout()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{t('Log out')} </span>
                    </MenuItem>
                </Menu>
            </Sidebar>

            
            {
                selected=="appointments" &&
                ( !hasSub ? 
                    <BusinessAppointmentsSection
                        id={data.business._id}
                        isSub={false}
                    /> 
                    :
                    subs.map((sub)=>{

                    })
                )
            }
            
            {
                selected=="settings" &&
                ( !hasSub ? 
                    <CalendarSettingsSection/>
                    :
                    subs.map((sub)=>{

                    })
                )
            }
            
            {
                selected=="info" &&
                <BusinessInfoSection/>
            }
            <ToastContainer/>
        </div>
    )
}