import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function UserProfileImage({image, handleUploadImage}){

    const {t} = useTranslation();


    const showImage = (url) => {
        const profileImage = document.querySelector('.profileImage');
        profileImage.src = url;
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        showImage(URL.createObjectURL(file));
        handleUploadImage(file);
    };

    return(
        <div className="profileImageBox">
            {
                image ? 
                <img className="profileImage" src={image.split("/public")[1]}/>
                : 
                <div className="noImage">
                    
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            </path>
                            <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            </path>
                        </g>
                    </svg>
                </div>
            }

            <label htmlFor="image" className="hoverUpload">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H8.4M12 15V4M12 4L15 7M12 4L9 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        </path> 
                    </g>
                </svg>
                <span>{t('Upload profile image')}</span>
            </label>
            
            <input
                type="file"
                id="image"
                onChange={(e) => handleImageChange(e)}
                className="hidden"
            />
        </div>
    )
}