import React, { Component } from 'react'

import '../css/Questionnaire.css'

class Questionnaire extends Component {
    state = {
        user_id: 0,
        job_title: '',
        working_hours_from: '',
        working_hours_to: '',
        take_breaks: false,
        breaks_quantity: null,
        break_length: null
    }

    getResponseFromDB = () => {
        return fetch('http://localhost:3000/api/v1/questionnaire', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(resp => resp.json())
        .then((data) => this.setState(data))
    }

    checkBoxFunc = () => {
        const checkInput = document.getElementById('take_breaks')
        return this.state.take_breaks ? null : checkInput.checked 
    }

    componentDidMount() {
        this.setState({ user_id: parseInt(localStorage.getItem('activeUser'))})
        this.getResponseFromDB()
        .then(() => this.checkBoxFunc()) 
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

    handleRadioChange = () => {
        this.setState({
            take_breaks: !this.state.take_breaks
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.postQuestionnaireResponse();
    }

    postQuestionnaireResponse = () => {
        fetch('http://localhost:3000/api/v1/questionnaire', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({...this.state})
        })
        .then(resp => resp.json())
        .then(() => this.props.history.push('/feedback'))
    }


    render() {
        const { take_breaks, job_title, working_hours_from, working_hours_to, breaks_quantity, break_length} = this.state
        return (
            <div className='questionnaire_form'>
                <h3>Please answer those questions:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='job_title'>
                        What is your job title?
                        <input 
                            type='text' 
                            name='job_title' 
                            value={job_title}
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
                                value={working_hours_from}
                                onChange={this.handleTextChange}
                            /> 
                        </label>
                        <label htmlFor='working_hours_to' className='inline_label'> 
                        &nbsp;to <input 
                                type='time' 
                                name='working_hours_to' 
                                value={working_hours_to}
                                onChange={this.handleTextChange}
                            />
                        </label>
                    </label>
                    <label htmlFor='take_breaks'>
                        Do you take breaks?
                        <br />
                        <input
                            id='take_breaks'
                            type='checkbox' 
                            name='take_breaks' 
                            value={take_breaks}
                            onChange={this.handleRadioChange}
                        />
                    </label>
                    {take_breaks 
                    && <div>
                        <label htmlFor='breaks_quantity'>
                            How many breaks?
                            <input 
                                type='number' 
                                name='breaks_quantity'
                                value={breaks_quantity}
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
                                value={break_length}
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