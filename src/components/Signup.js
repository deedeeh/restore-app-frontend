import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Form } from 'semantic-ui-react'

import '../css/Authentication.css'

class Signup extends Component {

    state = {
        name: "",
        username: "",
        password: "",
        errors: []
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    postDefaultQuestionnaire = (user_id) => {
        const body = {
            user_id,
            job_title: '',
            working_hours_from: '',
            working_hours_to: '',
            take_breaks: false,
            breaks_interval: null,
            break_length: null
            }
        fetch('http://localhost:3000/api/v1/questionnaires', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    submit = (e) => {
        e.preventDefault()
        const body = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }

        this.props.handleSubmit(body)
            .then((e) => {
                const err = this.props.handleResponse(e)
                this.setState({ errors: err })
            })
    }

    render () {
        // console.log('this.props', this.props)
        return (
            <Form className='signup_form' onSubmit={this.submit}>
                <Form.Field>
                    <label htmlFor='name'>Name</label>
                    <Form.Input 
                        type='text' 
                        name='name' 
                        value={this.state.name} 
                        onChange={this.handleChange} 
                        placeholder='Name'
                    />
                </Form.Field>
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
                {
                    this.state.errors.length > 0 && (
                        <div className="sign-up-errors">
                            <ul>
                        {
                            this.state.errors.map(e => <li key={e}>{e}</li>)
                        }
                        </ul>
                    </div>
                    )
                }
                <Button fluid type='submit' color='red'>Sign up</Button>
            </Form>
        )
    }
}

export default withRouter(Signup);