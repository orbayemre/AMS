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
                    <img src={user.profile_image.split('/public')[1]}/>
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