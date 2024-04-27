import { useEffect, useState } from "react";

const hours =["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
const minutes =["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];
export default function TimePicker({title,hour,minute,onChange}) {

    return (
        <>
            <div className="pickTime">
                <div className="label">
                    {title}:
                </div>
                <div className="timeCont">
                    <div className="pickHour">
                        <select name="hour" onChange={(e) => onChange(e.target.value+":"+minute)} defaultValue={hour}>
                            {  
                                hours.map(h =>{
                                    return <option key={h} value={h}> {h} </option>
                                })

                            }
                        </select>
                    </div>
                    <span>:</span>
                    <div className="pickMin">
                        <select name="minute" onChange={(e) => onChange(hour+":"+e.target.value)} defaultValue={minute}>
                            {  
                                minutes.map(m =>{
                                    return <option  key={m} value={m} > {m} </option>
                                })

                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}