import React, { Component } from 'react'

import '../index.css'

class Questionnaire extends Component {
    render() {
        return (
            <div className='questionnaire_form'>
                <h3>Please answer those questions:</h3>
                <form>
                    <label htmlFor='job_title'>
                        What is your job title?
                        <input type='text' name='job_title'/>
                    </label>
                </form>
            </div>
        )
    }
}

export default Questionnaire;