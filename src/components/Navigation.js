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
            <Link to="/about" className="menu-item" onClick={props.clickLink}>
                About
            </Link>
            <Link to="/dashboard" className="menu-item" onClick={props.clickLink}>
                Dashboard
            </Link>

            <Link to='/questionnaire' className="menu-item" onClick={props.clickLink}>
                Edit Profile
            </Link>
            
            <Link className="menu-item" to='/history' onClick={props.clickLink}>
                History
            </Link>

            <a className="menu-item" onClick={() => {logoutHandler(); props.clickLink()}}>
                Logout
            </a>
        </Menu>
    )
}

export default Navigation;