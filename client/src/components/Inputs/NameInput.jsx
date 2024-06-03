import '../../styles/auth.css';
import '../../styles/common.css';

export default function NameInput({value="",placeholder,onChange,autoFocus=false,theme=1}){

    if(theme == 1){
        return(
            <div className="mailInput-theme1 font-josefin-500">
                <div className="iconBox box-content">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#EBF2FA" className='icon' viewBox="0 0 32 32">
                        <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#1C4B82" className='icon' viewBox="0 0 32 32">
                        <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/>
                    </svg>
                </div>
                <input className="formInput  placeholder:text-first" type="text" value={value} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus}/>
    
            </div>
        )
    }
}