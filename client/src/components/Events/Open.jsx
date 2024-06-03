import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from "react-i18next"
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Params from "../../params"

export default function Open({index, bId, event, day, startTime, endTime, isSub}) {
    
    const navigate = useNavigate();
    const {t} = useTranslation();
    
    const {accessToken} = useSelector(state => state.authStore);
    const [isOpen, setIsOpen] = useState(false);
    const [desc, setDesc] = useState("");
    const [descHour, setDescHour] = useState("");
    const closeModal = (e)=>{
        setIsOpen(false)
    }
    const openModal = (e)=> {
        setIsOpen(true)
    }
    const handleConfirm = () =>{
        
        axios.post(Params.api+"/api/appointment/make",{
            business_id : bId,
            is_sub : isSub,
            date : {
                "day" : day.dayNum,
                "month" : day.monthNum,
                "year" : day.year,
                "start" : event.startHour,
                "end" : event.endHour
            },  
            start_time: startTime,
            end_time: endTime
        },{
            headers:{
                "Authorization" : "Bearer " + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t(data.message), {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className:"w-96"
                });
                closeModal();
                setTimeout(() => {
                    navigate("/user/my-appointments");
                }, 2500);

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
        var text = t("Do you approve of making an appointment on")
        var replacements = {
            "{day}": day.day,
            "{month}": t(day.month),
            "{dayWeek}": t(day.name),
            "{hour}": event.startHour
        };
        
        Object.keys(replacements).forEach(function(key) {
            text = text.replace(new RegExp(key, "g"), replacements[key]);
        });
        setDesc(text)
        setDescHour(text.split("[")[1].split("]")[0])

    },[])
    return (
        <>
        <div className="eventOpen w-full" key={index}>
            <button
            type="button"
            onClick={openModal}
            className="event open"
            >
                <span className="hour">
                    {event.startHour} 
                </span>
                <span className="status">
                    {t('Open')}
                </span>
            </button>
        </div>

        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25" style={{backgroundColor:"#00000063"}}/>
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full font-josefin-500 max-w-xl min-h-72 text-third flex flex-col justify-center items-center transform overflow-hidden bg-first rounded-2xl p-16 align-middle shadow-sm transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-3xl font-medium leading-6 pb-2 w-full font-josefin-700"
                    >
                        {t("Confirm appointment")}
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                        <p className="text-md">
                            {desc.split("[")[0]}
                            <span className='font-bold text-xl'> {descHour} </span>
                            {desc.split("]")[1]}
                        </p>
                    </div>

                    <div className="mt-1 w-full">
                        <button
                            type="button"
                            className="w-full mb-2 inline-flex justify-center rounded-md border border-transparent text-md duration-200 bg-third text-first hover:bg-first hover:text-third px-4 py-2 font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={handleConfirm}
                        >
                            {t("Confirm")}
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 hover:shadow-xl duration-200 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                        >
                            {t("cancel")}
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}
