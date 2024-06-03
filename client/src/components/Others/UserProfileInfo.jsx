import { useTranslation } from "react-i18next";
import NameInput from "../Inputs/NameInput";
import MailInput from "../Inputs/MailInput";

export default function UserProfileInfo({name, surname, email, handleName, handleSurname, handleEmail}){
    
    const {t} = useTranslation();

    return(
        <div className="profileInfoBox">
            <div className="profileInfoField">
                <label>{t('name')+":"}</label>
                <NameInput value={name} placeholder={t('name')+"*"} onChange={handleName} theme={2}/>
            </div>
            <div className="profileInfoField">
                <label>{t('surname')+":"}</label>
                <NameInput value={surname} placeholder={t('surname')+"*"} onChange={handleSurname} theme={2}/>
            </div>
            <div className="profileInfoField">
                <label>{t('email')+":"}</label>
                <MailInput value={email} placeholder={t('email')+"*"} onChange={handleEmail} theme={2}/>
            </div>
            
        </div>
    )
}