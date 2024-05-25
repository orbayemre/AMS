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

            var momentStart = moment(new Date());
            momentStart.add((i * 7), 'days')
            if(i != 0) {momentStart.startOf('day'); }

            var momentEnd = moment(momentStart);
            momentEnd.add(6, 'days')
            momentEnd.endOf('day');

            data.push({
                startData: momentStart.toDate(),
                startDay: momentStart.format('DD'),
                startMonth: momentStart.format('MMMM'),

                endData: momentEnd.toDate(),
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
