import { useState } from "react";
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';


import Params from "../../params";
import ImageGallery from "./ImageGallery";


export default function BusinessImagesSection(){
    
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {data, accessToken} = useSelector(state => state.authStore);


    const [images,setImages] = useState(data.business.images) 
    const [uploadImage, setUploadImage] = useState(null);


    
    const showImage = (url) => {
        const profileImage = document.querySelector('.uploadImage');
        profileImage.src = url;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUploadImage(file);
        showImage(URL.createObjectURL(file));
    };
    const handleDelete = (e) => {
        const src = document.querySelector('.lg-current img').getAttribute('src')
        var imagePath = src;
        if(!src.includes('public')){
            imagePath = "/public" + src
        }
        if(imagePath){

            axios.post(Params.api+"/api/business/delete-image",{
                "image":imagePath,
            },{
                headers:{
                    "Authorization" : "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(({data})=>{
                if(data.status == "success"){
                    toast.success(t("image deleted"), {
                        position: "bottom-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        navigate(0)
                    }, 1400);
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

    const handleSubmit = async (e) => {

        const formData = new FormData();
        formData.append('image', uploadImage);

        axios.post(Params.api+`/api/business/upload/${data.business._id}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(({data})=>{
            if(data.status == "success"){
                toast.success(t("image uploaded"), {
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



    return(
        
        <div className="bimgSection accountSection font-josefin-500">
            <h2>{t('Business Images')}</h2>

            <div className="images">
                <ImageGallery images={images} showDelete={true} handleDelete={handleDelete}/>
                <div className="addImage">

                    <label htmlFor="image" className="custom-file-upload">
                    {t('Select image')}
                    </label>    
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => handleImageChange(e)}
                        className="hidden"
                    />
                    <div>
                        <img className="uploadImage"/>
                    </div>
                    {
                        uploadImage &&
                        <div className="load" onClick={() => handleSubmit()}>
                            {t('Load')}
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}
