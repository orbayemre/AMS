import '../../styles/auth.css';
import '../../styles/common.css';

export default function MailInput({value="",placeholder,onChange,autoFocus=false,theme=1}){

    if(theme == 1){
        return(
            <div className="mailInput-theme1 font-josefin-500">
                <div className="iconBox box-content">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#EBF2FA" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                </div>
                <input className="formInput  placeholder:text-third" type="text" value={value} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus}/>
    
            </div>
        )
    }
    else{
        return(
            <div className="mailInput-theme2 font-josefin-500">
                <div className="iconBox box-content">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#1C4B82" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                </div>
                <input className="formInput  placeholder:text-first" type="text" value={value} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus}/>
    
            </div>
        )
    }
}