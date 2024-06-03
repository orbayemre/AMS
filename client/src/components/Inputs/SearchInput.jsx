import '../../styles/search.css';
import '../../styles/common.css';

export default function SearchInput({value="",placeholder,onChange,submit,autoFocus=false}){

    const keyDown13 = (e) =>{
        if(e.keyCode === 13){
            submit();
        }
    }

    const handleIconClick = () =>{
        submit();
    }
    return(
        <div className="searchInput font-josefin-500">
            <input className="formInput  placeholder:text-first" type="text" value={value} placeholder={placeholder} onChange={onChange} autoFocus={autoFocus} onKeyDown={keyDown13}/>
            <div className="iconBox box-content" onClick={handleIconClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}