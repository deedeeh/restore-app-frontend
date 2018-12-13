import React, { Component } from 'react'

import Login from '../components/Login'
import '../css/authentication.css'

class Authentication extends Component {
    render() {
        return (
            <div>
                <h5>An app where you always rely on to remind you of tasks during your work.</h5>
                <button className='login_link'>Log in</button>
                |
                <button className='signup_link'>Sign up</button>
                <Login />
            </div>
        )
    }
}

export default Authentication;