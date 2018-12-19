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

    validate = () => {
        return fetch('http://localhost:3000/api/v1/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(resp => resp.json()) 
    }

    // login = (body) => {
    //     return fetch('http://localhost:3000/api/v1/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(body)
    //     }).then(resp => resp.json()).then(data => console.log(data)) 
    // }

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
        const { show_signup } = this.state
        return (
            <div>
                <h5>An app where you always rely on to remind you of tasks during your work.</h5>
                <button onClick={this.handleClickForLogin} className='login_link'>Log in</button>
                <button onClick={this.handleClickForSignup} className='signup_link'>Sign up</button>
                {show_signup ? 
                    <Signup setUser={this.props.setUser} handleSubmit={this.signup}/> : 
                    <Login postLoginDetails = {this.props.postLoginDetails}/>
                }
            </div>
        )
    }
}

export default Authentication;