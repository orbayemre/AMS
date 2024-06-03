import { useTranslation } from "react-i18next";
import SureModal from "../Modals/SureModal";

export default function SubBusinessCard({name, handleRemoveSub}){

    const {t} = useTranslation();

    return(
        <div className="subCard">
            <div className="subName">
                {name}
            </div>

            <div className="remove">
                <SureModal
                    buttonContent={
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M10 11V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M14 11V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M4 7H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                        </svg>
                    }
                    title={t('Are you sure you want to delete this sub-business?')}
                    okLabel={t('Delete')}
                    cancelLabel={t('Cancel')}
                    handleOk={handleRemoveSub}
                />
            </div>
        </div>
    )
}