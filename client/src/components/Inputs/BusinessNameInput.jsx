import '../../styles/auth.css';
import '../../styles/common.css';

export default function BusinessNameInput({value="",placeholder,onChange,autoFocus=false,theme=1}){

    if(theme == 1){
        return(
            <div className="mailInput-theme1 font-josefin-500">
                <div className="iconBox box-content">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#EBF2FA" className='icon' viewBox="0 0 512 512">
                        <g>
                            <path d="M451.528,129.424H60.472C27.077,129.424,0,156.494,0,189.896v40.313l212.743,41.306v-3.41   c0-11.139,9.028-20.16,20.16-20.16h45.014c11.132,0,20.159,9.021,20.159,20.16v3.41L512,229.813v-39.917   C512,156.494,484.924,129.424,451.528,129.424z"/>
                            <path d="M298.076,341.563c0,11.139-9.028,20.159-20.159,20.159h-45.014c-11.132,0-20.16-9.02-20.16-20.159v-40   L0,260.258v164.25c0,33.403,27.077,60.472,60.472,60.472h391.056c33.396,0,60.472-27.069,60.472-60.472V259.854l-213.924,41.709   V341.563z"/>
                            <rect x="234.076" y="269.278" width="42.667" height="71.111"/>
                            <path d="M188.798,71.826c0.007-1.833,0.688-3.305,1.875-4.535c1.222-1.187,2.702-1.861,4.528-1.874h121.597   c1.827,0.014,3.306,0.687,4.528,1.874c1.188,1.23,1.861,2.702,1.875,4.535v32h38.396v-32c0.007-12.312-5.041-23.632-13.125-31.68   c-8.041-8.076-19.36-13.132-31.674-13.125H195.202c-12.312-0.006-23.632,5.049-31.68,13.125   c-8.077,8.049-13.132,19.368-13.119,31.68v32h38.396V71.826z"/>
                        </g>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#1C4B82" className='icon' viewBox="0 0 512 512">
                        <g>
                            <path d="M451.528,129.424H60.472C27.077,129.424,0,156.494,0,189.896v40.313l212.743,41.306v-3.41   c0-11.139,9.028-20.16,20.16-20.16h45.014c11.132,0,20.159,9.021,20.159,20.16v3.41L512,229.813v-39.917   C512,156.494,484.924,129.424,451.528,129.424z"/>
                            <path d="M298.076,341.563c0,11.139-9.028,20.159-20.159,20.159h-45.014c-11.132,0-20.16-9.02-20.16-20.159v-40   L0,260.258v164.25c0,33.403,27.077,60.472,60.472,60.472h391.056c33.396,0,60.472-27.069,60.472-60.472V259.854l-213.924,41.709   V341.563z"/>
                            <rect x="234.076" y="269.278" width="42.667" height="71.111"/>
                            <path d="M188.798,71.826c0.007-1.833,0.688-3.305,1.875-4.535c1.222-1.187,2.702-1.861,4.528-1.874h121.597   c1.827,0.014,3.306,0.687,4.528,1.874c1.188,1.23,1.861,2.702,1.875,4.535v32h38.396v-32c0.007-12.312-5.041-23.632-13.125-31.68   c-8.041-8.076-19.36-13.132-31.674-13.125H195.202c-12.312-0.006-23.632,5.049-31.68,13.125   c-8.077,8.049-13.132,19.368-13.119,31.68v32h38.396V71.826z"/>
                        </g>
                    </svg>
                </div>
                <input className="formInput  placeholder:text-first" type="text" value={value} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus}/>
    
            </div>
        )
    }
}