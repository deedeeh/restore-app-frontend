import React, { Component } from 'react'

import '../css/Questionnaire.css'

class Questionnaire extends Component {
    state = {
        job_title: '',
        working_hours: '',
        take_breaks: false
    }

    handleChange = event => {
        this.setState({
           [event.target.name]: event.target.value 
        })
    }

    render() {
        const { take_breaks } = this.state
        return (
            <div className='questionnaire_form'>
                <h3>Please answer those questions:</h3>
                <form>
                    <label htmlFor='job_title'>
                        What is your job title?
                        <input type='text' name='job_title'/>
                    </label>
                    <label htmlFor='working_hours'>
                        What are your working hours?
                        <br />
                        from <input type='time' name='working_hours'/> to <input type='time' name='working_hours'/>
                    </label>
                    <br />
                    <label htmlFor='take_breaks'>
                        Do you take breaks?
                        <br />
                        <input 
                            type='radio' 
                            name='take_breaks' 
                            value='Yes'
                            handleChange={this.handleChange}
                        />Yes
                        <input 
                            className='no_margin_left' 
                            type='radio' 
                            name='take_breaks' 
                            value='No'
                            handleChange={this.handleChange}
                        />No
                    </label>
                    {take_breaks 
                    ? <div>
                        <label>
                            How many breaks?
                            <input type='number'/>
                        </label>
                    </div>
                    : null}
                </form>
            </div>
        )
    }
}

export default Questionnaire;