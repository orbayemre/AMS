
import { useTranslation } from "react-i18next";

export default function Full({event,index}){

    const {t} = useTranslation();

    return(
        <div className="event full" key={index} num={index}>
            <span className="hour">
                {event.startHour} 
            </span>
            <span className="status">
                {t('Full')}
            </span>
        </div>
    )
}