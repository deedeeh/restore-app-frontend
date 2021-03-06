import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import Login from '../components/Login'
import Signup from '../components/Signup'
import '../css/authentication.css'

class Authentication extends Component {
    state = {
        show_signup: false,
        isActive: false
    }


    handleClickForSignup = () => {
        this.setState({
            show_signup: true,
            isActive: true
        })
    }

    handleClickForLogin = () => {
        this.setState({
            show_signup: false,
            isActive: true
        })
    }

    validate = () => {
        return fetch('http://localhost:3000/api/v1/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(resp => resp.json()) 
    }

    signup = (body) => {
        return fetch('http://localhost:3000/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json()) 
    }

    render() {
        const { show_signup, isActive } = this.state
        return (
            <div className='auth_container'>
                <h3>Restore assists you while you work.</h3>
                <div className='buttons_container'>
                    <Button color='linkedin' onClick={this.handleClickForLogin} className='login_link'>Log in</Button>
                    <Button inverted color='red' onClick={this.handleClickForSignup} className='signup_link'>Sign up</Button>
                </div>
                {show_signup ? 
                    <Signup className='signup_link' handleResponse={this.props.handleSignUpResponse} handleSubmit={this.signup}/> : 
                    <Login className='login_link' postLoginDetails = {this.props.postLoginDetails}/>
                }
            </div>
        )
    }
}

export default Authentication;