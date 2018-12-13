import React from 'react'

const Signup = () => {
    return (
        <form>
            <label htmlFor='name'>Name:
                <input type='text' name='name' />
            </label>
            <br />
            <label htmlFor='username'>Username:
                <input type='text' name='username' />
            </label>
            <br />
            <label htmlFor='password'>Password:
                <input type='text' name='password' />
            </label>
            <br />
            <input type='submit' value='Sign up'/>
        </form>
    )
}

export default Signup;