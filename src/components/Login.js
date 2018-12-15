import React, { Component } from 'react'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='login_form'>
                <label htmlFor='username'>Username:
                    <input 
                        type='text' 
                        name='username' 
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label htmlFor='password'>Password:
                    <input 
                        type='password' 
                        name='password'    
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <input type='submit' value='Log in'/>
            </form>
        )
    }
}

export default Login;