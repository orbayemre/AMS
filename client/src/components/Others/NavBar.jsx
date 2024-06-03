import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../Buttons/ProfileMenu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Lottie from '../Animations/Lottie';
import i18next from "i18next";
import { useEffect } from "react";
import { setLang } from "../../store/languageStore";

export default function NavBar(){

    const {isLogin, userType, data} = useSelector(state => state.authStore);
    const {lang} = useSelector(state => state.languageStore);
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLang = async (lang) =>{
        await dispatch(setLang(lang)); 
        await navigate(0)
    }
    
    return(
        <div className="navbar">
            <div className="navbarCont">
                <div className="logo" onClick={() => navigate("/")}>
                    
                    <Lottie link={"https://lottie.host/ab45514b-869b-4dd6-af2c-756333f7086e/0kK32ovsSa.json"} width={"80px"} height={"80px"}/>
                    <span>AMS</span>
                </div>
                
                <div className="rightContent">
                    {
                        (isLogin && userType == "user") &&
                        <div className="authBox">
                            <ProfileMenu user={data.user}/>



                        </div>
                    }
                    {
                        (isLogin && userType == "business") &&
                        <div className="authBox">
                            <ProfileMenu business={data.business} isBusiness={true}/>



                        </div>
                    }
                    {
                        !isLogin &&
                        <div className="authBox notLoged font-josefin-500">
                            <div className="userAuth">
                                <div className="login" onClick={() => navigate("/user/login")}>
                                    {t('login')}
                                </div>
                                <div className="register" onClick={() => navigate("/user/register")}>
                                    {t('register')}
                                </div>

                            </div>
                            <div className="businessAuth" onClick={() => navigate("/business/register")}>
                                {t('Create a Business')}
                            </div>



                        </div>
                    }
                    <div className="language">
                        <div className="tr" onClick={() => handleLang("tr-TR")}>
                            <img className={lang == "tr-TR" ? "active": ""} src="/icons/tr.png"/>

                        </div>
                        <div className="en" onClick={() => handleLang("en-EN")}>
                            <img className={lang == "en-EN" ? "active": ""} src="/icons/uk.png"/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}