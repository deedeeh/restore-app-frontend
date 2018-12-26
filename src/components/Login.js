import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postLoginDetails(this.state)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className='login_form'>
                <Form.Field>
                <label htmlFor='username'>Username</label>
                    <Form.Input 
                        type='text' 
                        name='username' 
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder='Username'
                    />
                </Form.Field>
                <Form.Field>
                <label htmlFor='password'>Password</label>
                    <Form.Input 
                        type='password' 
                        name='password'    
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder='Password'
                    />
                </Form.Field>
                <Button fluid type='submit' color='linkedin'>Log in</Button>
            </Form>
        )
    }
}

export default Login;