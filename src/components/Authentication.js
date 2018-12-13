import React, { Component } from 'react'
import '../css/authentication.css'

class Authentication extends Component {
    render() {
        return (
            <div>
                <h5>An app where you always rely on to remind you of tasks during your work.</h5>
                <button className='login_link'>Log in</button>
                <form>
                    <label htmlFor='username'>Username:
                        <input type='text' name='username' />
                    </label>
                    <br />
                    <label htmlFor='password'>Password:
                        <input type='text' name='password' />
                    </label>
                    <br />
                    <input type='submit' value='Log in'/>
                </form>
            </div>
        )
    }
}

export default Authentication;