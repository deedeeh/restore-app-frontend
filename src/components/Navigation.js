import React from 'react';
import { slide as Menu } from "react-burger-menu";

const Navigation = (props) => {

    return (
       <Menu {...props}>
            <a className="menu-item" href="/about">
                About
            </a>

            <a className="menu-item" href="#">
                Edit Profile
            </a>

            <a className="menu-item" href="#">
                History
            </a>

            <a className="menu-item" href="/">
                Logout
            </a>
        </Menu>
    )
}

export default Navigation;