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

    submit = (e) => {
        e.preventDefault()
        const body = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }

        this.props.handleSubmit(body)
            .then(res => {
                localStorage.setItem('token', res.token)
                this.props.history.push('/about')
            })
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

/* <input type='submit' value='Sign up'/> */

export default withRouter(Signup);