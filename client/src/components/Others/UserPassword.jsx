import { useTranslation } from "react-i18next";
import PasswordInput from "../Inputs/PasswordInput";

export default function UserPassword({exPassword,newPassword,reNewPassword, handleExPassword, handleNewPassword, handleReNewPassword}){

    const {t} = useTranslation();

    return(
        <>
        
            <h3 className="infoHeader">{t("Password Change")}:</h3>
            <div className="infoField passField">
                <label> {t("Ex Password")}: </label>
                <PasswordInput value={exPassword} placeholder={t('Ex Password')+"*"} onChange={handleExPassword} theme={2}/>
            </div>
            <div className="infoField passField">
                <label> {t("New Password")}: </label>
                <PasswordInput value={newPassword} placeholder={t('New Password')+"*"} onChange={handleNewPassword} theme={2}/>
            </div>
            <div className="infoField passField">
                <label> {t("Re New Password")}: </label>
                <PasswordInput value={reNewPassword} placeholder={t('Re New Password')+"*"} onChange={handleReNewPassword} theme={2}/>
            </div>
        </>
    )
}