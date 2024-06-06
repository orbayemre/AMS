import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout }  from "../../store/authStore";
import SureModal from '../Modals/SureModal';

export default function ProfileMenu({user,business,isBusiness=false}) {
    
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goMyAccount = ()=>{
        navigate("/user/my-account")
    }
    const goAppointment = ()=>{
        navigate("/user/my-appointments")
    }
    const goAccount = ()=>{
        navigate("/business/account")
    }

    if(isBusiness){
        return (
            <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='menuButton'
            >
                <div className='email'>
                    {business.name}
                </div>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={goAccount}> {t('My Account')} </MenuItem>
                <MenuItem className='logout'> 
                    <SureModal 
                        buttonContent={t('Log out')} 
                        title={t('Are you sure you want to log out?')}
                        okLabel={t('Log out')}
                        cancelLabel={t('Cancel')}
                        handleOk={() => dispatch(setLogout())} /> 
                </MenuItem>
            </Menu>
            </div>
        );

    }
    else{
        return (
            <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='menuButton'
            >
                <div className="avatar">
                    {
                        user.profile_image ?
                        <img src={user?.profile_image.split('/public')[1]}/>
                        :
                        <div className="noImage">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                    <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                </g>
                            </svg>
                        </div>

                    }
                </div>
                <div className='email'>
                    {user.email}
                </div>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={goMyAccount}> {t('My Account')} </MenuItem>
                <MenuItem onClick={goAppointment}> {t('My Appointments')} </MenuItem>
                <MenuItem className='logout'> 
                    <SureModal 
                        buttonContent={t('Log out')} 
                        title={t('Are you sure you want to log out?')}
                        okLabel={t('Log out')}
                        cancelLabel={t('Cancel')}
                        handleOk={() => dispatch(setLogout())} /> 
                </MenuItem>
            </Menu>
            </div>
        );
    }

}