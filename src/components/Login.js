import React from 'react'

const Login = () => {
    return (
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
    )
}

export default Login;