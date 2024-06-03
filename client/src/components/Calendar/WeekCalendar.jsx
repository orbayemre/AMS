import { useEffect, useState } from "react"
import moment from "moment";
import { useTranslation } from "react-i18next";
import Full from "../Events/Full";
import Open from "../Events/Open";


export default function WeekCalendar({id, activeWeek, weekLen, weeksData, appointments, start, end, duration, breakTime, workDays, offTimes, isSub}){

    const {t} = useTranslation();

    const [loading,setLoading] = useState(true);
    const [events,setEvents] = useState(null);
    
    const createEvents = () =>{
        const events = [];
        
        const now  = new Date()
        now.setHours(parseInt(start.split(":")[0]), parseInt(start.split(":")[1]), 0, 0);
        const startTime = moment(now);
        let i = 1;
        let y = true;
        while (y) {
            
            if(i == 1){
                const endTime = moment(startTime);
                endTime.add(parseInt(duration), 'm'),
                events.push({
                    startHour : startTime.format('HH:mm'),
                    endHour : endTime.format('HH:mm'),
                    status : "open"
                });
            }
            else{
                startTime.add(parseInt(duration) + parseInt(breakTime), 'm');
                
                if(  parseInt(startTime.format('HH')) > parseInt(end.split(":")[0]) ){
                    y=false;
                    break;
                }
                else if(  parseInt(startTime.format('HH')) == parseInt(end.split(":")[0]) ){
                    if( parseInt(startTime.format('mm')) >= parseInt(end.split(":")[1])){
                        y=false;
                        break;
                    }
                }
                const endTime = moment(startTime);
                endTime.add(parseInt(duration), 'm'),
                events.push({
                    startHour : startTime.format('HH:mm'),
                    endHour : endTime.format('HH:mm'),
                    status : "open"
                });
            }
            i++;
        }
        setEvents(events);
    }

    useEffect(()=>{
        if(weeksData && weeksData.length > 0){
            if(appointments){
                createEvents();
            }
        }
    },[weeksData,appointments]);
    useEffect(()=>{
        if(events){
            setLoading(false);
        }
    },[events]);

    if(loading){
        return(
            <div>
                {t('Loading...')}
            </div>
        )
    }
    return(
        <>
            <div className="weekCalendar font-josefin-500">
                <div className="weeks">
                    {
                        weeksData.map((week, index)=> {
                            const momentStart = moment(week.startData);
                            const days = [
                                { data: momentStart.toDate() ,name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                                { data: momentStart.add(1, 'days').toDate(), name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                                { data: momentStart.add(1, 'days').toDate(), name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                                { data: momentStart.add(1, 'days').toDate(), name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                                { data: momentStart.add(1, 'days').toDate(), name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                                { data: momentStart.add(1, 'days').toDate(), name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                                { data: momentStart.add(1, 'days').toDate(), name: momentStart.format('dddd'), day: momentStart.format('DD'), dayNum: parseInt(momentStart.format('D')), weekDayNum: parseInt(momentStart.isoWeekday()), month: momentStart.format('MMMM'), monthNum: parseInt(momentStart.format('M')), year: parseInt(momentStart.format('Y'))}, 
                            ]
                            const now = moment();
                            return(
                                <div className={"week" + ( (activeWeek == index+1) ? " active" : "") } key={index} data-num={index+1}>
                                    {      
                                        days.map((day, index) => {
                                            if(workDays[day.weekDayNum-1]){
                                                return (
                                                    <div className="day" key={index}>
                                                        <div className="dayHeader font-josefin-600">
                                                            <span className="dayDate">
                                                                {day.day} {t(day.month)}
                                                            </span> 
                                                            <span className="dayName">
                                                                {t(day.name)}
                                                            </span>
                                                        </div>
                                                        <div className="dayBody">
                                                            {
                                                                events.map((event,index) =>{
                                                                    const eventStartTime = day.data.toJSON().split("T")[0] + "T" + event.startHour + ":00";
                                                                    const eventEndTime = day.data.toJSON().split("T")[0] + "T" + event.endHour + ":00";
                                                                    const momentStartTime = moment(eventStartTime);

                                                                    var isFull = false;
                                                                    
                                                                    appointments.map((appointment)=>{
                                                                        if( (appointment.date.day == day.dayNum) && ( appointment.date.month == day.monthNum ) && ( appointment.date.year == day.year )){
                                                                            if( (eventStartTime == appointment.start_time.split(".")[0]) && (eventEndTime == appointment.end_time.split(".")[0]) ){
                                                                                isFull = true;
                                                                            }
                                                                        }
                                                                    });
                                                                    
                                                                    if( !(now > momentStartTime)){
                                                                        if(isFull){
                                                                            return(
                                                                                <Full event={event} key={index} index={index}/>
                                                                            )

                                                                        }
                                                                        else{
                                                                            return(
                                                                                <Open 
                                                                                    index={index}
                                                                                    key={index}
                                                                                    bId={id}
                                                                                    event={event} 
                                                                                    day={day} 
                                                                                    startTime={day.data.toJSON().split("T")[0] + "T" + event.startHour + ":00"} 
                                                                                    endTime={day.data.toJSON().split("T")[0] + "T" + event.endHour + ":00"} 
                                                                                    isSub={isSub} 
                                                                                
                                                                                />
                                                                            )
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return (
                                                    <div className="day off" key={index}>
                                                        <div className="dayHeader font-josefin-600">
                                                            <span className="dayDate">
                                                                {day.day} {t(day.month)}
                                                            </span> 
                                                            <span className="dayName">
                                                                {t(day.name)}
                                                            </span>
                                                        </div>
                                                        <div className="dayBody">{t('Closed all day')}</div>
                                                    </div>
                                                )
                                            }
                                        })   

                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}