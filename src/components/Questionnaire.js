import React, { Component } from 'react'

import '../css/Questionnaire.css'

class Questionnaire extends Component {
    state = {
        job_title: '',
        working_hours_from: '',
        working_hours_to: '',
        take_breaks: false,
        breaks_quantity: 0,
        break_length: 0
    }

    handleTextChange = event => {
        this.setState({
           [event.target.name]: event.target.value
        })
    }

    handleChangeForNumbers = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    handleRadioChange = newBoolean => {
        this.setState({
            take_breaks: newBoolean === 'yes' ? true : false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('now ready')
    }

    postQuestionnaireResponse = () => {
        fetch('http://localhost:3000/api/v1/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                job_title: 'test',
                working_hours_from: 'test',
                working_hours_to: 'test',
                take_breaks: true,
                breaks_quantity: 2,
                break_length: 20
            })
        })
    }

    render() {
        const { take_breaks } = this.state
        return (
            <div className='questionnaire_form'>
                <h3>Please answer those questions:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='job_title'>
                        What is your job title?
                        <input 
                            type='text' 
                            name='job_title' 
                            onChange={this.handleTextChange}
                        />
                    </label>
                    <label>
                        What are your working hours?
                        <br />
                        <label htmlFor='working_hours_from' className='inline_label'>
                            from <input 
                                type='time' 
                                name='working_hours_from' 
                                onChange={this.handleTextChange}
                            /> 
                        </label>
                        <label htmlFor='working_hours_to' className='inline_label'> 
                        &nbsp;to <input 
                                type='time' 
                                name='working_hours_to' 
                                onChange={this.handleTextChange}
                            />
                        </label>
                    </label>
                    <label htmlFor='take_breaks'>
                        Do you take breaks?
                        <br />
                        <input 
                            type='radio' 
                            name='take_breaks' 
                            value='yes'
                            onChange={e => this.handleRadioChange(e.target.value)}
                        /> Yes
                        <input 
                            className='no_margin_left' 
                            type='radio' 
                            name='take_breaks' 
                            value='no'
                            onChange={e => this.handleRadioChange(e.target.value)}
                        /> No
                    </label>
                    {take_breaks 
                    && <div>
                        <label htmlFor='breaks_quantity'>
                            How many breaks?
                            <input 
                                type='number' 
                                name='breaks_quantity'
                                onChange={this.handleChangeForNumbers}
                            />
                        </label>
                        <label htmlFor='break_length'>
                            How long roughly is each break?
                            <br />
                            <input 
                                className='inline_text'
                                type='number' 
                                name='break_length' 
                                onChange={this.handleChangeForNumbers}
                            /> minutes
                        </label>
                    </div>}
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        )
    }
}

export default Questionnaire;