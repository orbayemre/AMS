import { useEffect } from "react"
import { useState } from "react"
import moment from "moment"
import { useTranslation } from "react-i18next";

export default function WeekControl({activeWeek = 1, weekLen = 4, onNext, onPrevious, handleWeeksData}){

    const [weeksData,setWeeksData] = useState([])


    const {t} = useTranslation();
    const createWeeksData = () =>{

        const data = [];

        for (let i = 0; i < weekLen; i++) {
            const start = new Date();
            const end = new Date();

            start.setDate(start.getDate() + (i * 7));
            if(i != 0) { start.setHours(0, 0, 0, 0); }
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 0);
            
            const momentStart = moment(start);
            const momentEnd = moment(end);
            data.push({
                startData: start,
                startDay: momentStart.format('DD'),
                startMonth: momentStart.format('MMMM'),

                endData: end,
                endDay: momentEnd.format('DD'),
                endMonth: momentEnd.format('MMMM'),
            });

        }
        setWeeksData(data);
        handleWeeksData(data);
    }

    useEffect(()=>{
        createWeeksData()

    },[]);

    return(
        <>
            <div className="weekControl font-josefin-500">
                <div className={"controlButton previousWeekButton" + ( (activeWeek != 1) ?  " active" : "" ) } onClick={onPrevious}>
                    {t('previous')}
                </div>

                <div className="weeks">
                    {
                        weeksData.map((week, index)=>
                            <div className={"week" + ( (activeWeek == index+1) ? " active" : "") }  key={index} data-num={index+1} data-start={week.startData.toJSON()} data-end={week.endData.toJSON()}>
                                <span className="start">
                                    <span className="num">{week.startDay}</span> { t(week.startMonth)} 
                                </span>
                                <span> - </span>
                                <span className="end">
                                    <span className="num">{week.endDay}</span> {t(week.endMonth)} 
                                </span>
                            </div>
                        )
                        
                    }
                </div>

                <div className={"controlButton nextWeekButton" + ( (activeWeek != weekLen) ?  " active" : "" ) } onClick={onNext}>
                    {t('next')}
                </div>

            </div>
        </>
    )
}
