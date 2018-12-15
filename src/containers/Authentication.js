import React, { Component } from 'react'

import Login from '../components/Login'
import Signup from '../components/Signup'
import '../css/Authentication.css'

class Authentication extends Component {
    state = {
        show_signup: false
    }

    handleClickForSignup = () => {
        this.setState({
            show_signup: true
        })
    }

    handleClickForLogin = () => {
        this.setState({
            show_signup: false
        })
    }

    render() {
        const { show_signup } = this.state
        return (
            <div>
                <h5>An app where you always rely on to remind you of tasks during your work.</h5>
                <button onClick={this.handleClickForLogin} className='login_link'>Log in</button>
                |
                <button onClick={this.handleClickForSignup} className='signup_link'>Sign up</button>
                {show_signup ? 
                    <Signup /> : 
                    <Login />
                }
            </div>
        )
    }
}

export default Authentication;