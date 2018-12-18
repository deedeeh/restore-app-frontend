import React from 'react';
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'


const Navigation = (props) => {
    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('activeUser');
        window.location.reload();
    }

    return (
       <Menu {...props}>
            <a className="menu-item" href="/about">
                About
            </a>

            <Link to='/questionnaire' className="menu-item">
                Edit Profile
            </Link>
            
            <a className="menu-item" href='#'>
                History
            </a>

            <a className="menu-item" onClick={logoutHandler}>
                Logout
            </a>
        </Menu>
    )
}

export default Navigation;