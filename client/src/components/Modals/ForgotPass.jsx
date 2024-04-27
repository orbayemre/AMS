import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from "react-i18next"
import { Fragment, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Params from "../../params"
import MailInput from '../Inputs/MailInput';

export default function ForgotPass({userType="user"}) {
    
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [email, setEmail] = useState("")

    const closeModal = (e)=>{
        setIsOpen(false)
    }
    const openModal = (e)=> {
        setIsOpen(true)
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleSubmit = (e)=>{
        if(userType == "user"){
            
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
            else{
                setIsDisable(true);
                axios.post(Params.api+"/api/user/forgot-password",{
                    email
                })
                .then(({data})=>{
                    if(data.status == "success"){
                        toast.success(t(data.message), {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setIsOpen(false);
                        setIsDisable(false);
                    }else{
                        toast.error(t(data.response.data.message), {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setIsDisable(false);
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
                    setIsDisable(false);
                });   
            } 
        }
        else{
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
            else{
                setIsDisable(true);
                axios.post(Params.api+"/api/business/forgot-password",{
                    email
                })
                .then(({data})=>{
                    if(data.status == "success"){
                        toast.success(t(data.message), {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setIsOpen(false);
                        setIsDisable(false);
                    }else{
                        toast.error(t(data.response.data.message), {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setIsDisable(false);
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
                    setIsDisable(false);
                });   
            } 
        }
    }

    return (
        <>
        <div className="forgotPass font-josefin-700">
            <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
            {t("forgot password")}
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
                        {t("forgot your password")}
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                        <p className="text-sm">
                            {t("we will email you a link to reset your password")}
                        </p>
                    </div>

                    <div className="mt-6 w-full pb-4">
                        <MailInput value={email} placeholder={t('email')} onChange={handleEmail} autoFocus={true}/>
                    </div>

                    <div className="mt-1 w-full">
                        <button
                            type="button"
                            className="w-full mb-2 inline-flex justify-center rounded-md border border-transparent text-md duration-200 bg-third text-first hover:bg-first hover:text-third px-4 py-2 font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={handleSubmit}
                            disabled={isDisable}
                        >
                            {t("send")}
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
