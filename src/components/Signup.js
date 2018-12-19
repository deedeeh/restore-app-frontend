import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Signup extends Component {

    state = {
        name: "",
        username: "",
        password: ""
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
            .then(res => {
                console.log(res.token)
                this.props.setUser(res.user)
                localStorage.setItem('token', res.token)
            })
            .then(() => this.props.history.push('/about'))
    }

    render () {
        console.log('this.props', this.props)
        return (
            <form className='signup_form' onSubmit={this.submit}>
                <label htmlFor='name'>Name:
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                </label>
                <br />
                <label htmlFor='username'>Username:
                    <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
                </label>
                <br />
                <label htmlFor='password'>Password:
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
                </label>
                <br />
                <button>Submit</button>
            </form>
        )
    }
}

export default withRouter(Signup);