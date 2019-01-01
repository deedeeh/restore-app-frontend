import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

import '../css/Questionnaire.css'

class Questionnaire extends Component {
    state = {
        questionnaire: { 
            user_id: 0,
            job_title: '',
            working_hours_from: '',
            working_hours_to: '',
            take_breaks: false,
            breaks_interval: null,
            break_length: null
        },
        errors: []
    }

    getResponseFromDB = () => {
        return fetch('http://localhost:3000/api/v1/questionnaire', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        })
        .then(resp => resp.json())
        .then((data) => this.setState({ questionnaire: data }))
    }

    componentDidMount() {
        this.setState({ user_id: this.props.user.id})
        this.getResponseFromDB()
    }

    handleTextChange = event => {
        this.setState({
            questionnaire: {
                ...this.state.questionnaire,
                [event.target.name]: event.target.value
            }
        })
    }

    handleChangeForNumbers = event => {
        this.setState({
            questionnaire: {
                ...this.state.questionnaire,
                [event.target.name]: parseInt(event.target.value)
            }
        })
    }

    handleBreaksCheckboxChange = () => {
        this.setState({
            questionnaire: {
                ...this.state.questionnaire, 
                take_breaks: !this.state.questionnaire.take_breaks
            }
        })
    }

    //converts the hh:mm to minutes and it will be called before saving the state to the db
    handleBreaksInterval = event => {
        
        const breaksIntervalInMinutes = parseInt(event.target.value)
        this.setState({
            questionnaire: {
                ...this.state.questionnaire, 
                breaks_interval: breaksIntervalInMinutes * 60
            }
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
                'Authorization': this.props.token
            },
            body: JSON.stringify({...this.state.questionnaire})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                this.props.updateQuestionnaire(data)
                this.props.history.push('/feedback')
            }
        })
    }


    render() {
        const { take_breaks, job_title, working_hours_from, working_hours_to, breaks_interval, break_length} = this.state.questionnaire
        return (
            <div className='questionnaire_form'>
                <h3>Please answer those questions:</h3>
                {
                    this.state.errors.length > 0 && (
                        <div className="questionnaire-errors">
                            <ul>
                        {
                            this.state.errors.map(e => <li key={e}>{e}</li>)
                        }
                        </ul>
                    </div>
                    )
                }
                <Form onSubmit={this.handleSubmit} size='large'>
                    <Form.Field>
                    <label htmlFor='job_title'>What is your job title?</label>
                        <input 
                            type='text' 
                            name='job_title' 
                            value={job_title}
                            onChange={this.handleTextChange}
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                    <label>What are your working hours?</label>
                        <Form.Field inline>
                            <label htmlFor='working_hours_from' className='inline_label'>From</label>
                                <input 
                                    type='time' 
                                    min="00:00" 
                                    max="24:00"
                                    name='working_hours_from' 
                                    value={working_hours_from}
                                    onChange={this.handleTextChange}
                                    required
                                /> 
                            <label htmlFor='working_hours_to' className='inline_label'>to</label> 
                                <input 
                                    type='time' 
                                    min="00:00" 
                                    max="24:00"
                                    name='working_hours_to' 
                                    value={working_hours_to}
                                    onChange={this.handleTextChange}
                                    required
                                />
                        </Form.Field>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='take_breaks'>Do you take breaks?</label>
                            <Form.Checkbox
                                id='take_breaks'
                                type='checkbox' 
                                checked={take_breaks}
                                name='take_breaks' 
                                value={`${take_breaks}`}
                                onChange={this.handleBreaksCheckboxChange}
                            />
                    </Form.Field>
                    {take_breaks 
                    && <div>
                        <Form.Field>
                        <label htmlFor='breaks_interval'>How often do you want to take breaks?</label>
                            <select required name='breaks_interval' onChange={this.handleBreaksInterval} value={breaks_interval / 60}>
                                <option value='6'>0.1 hour</option>
                                <option value='15'>0.25 hour</option>
                                <option value='60'>1 hour</option>
                                <option value='120'>2 hours</option>
                                <option value='180'>3 hours</option>
                                <option value='240'>4 hours</option>
                            </select>
                        </Form.Field>
                        <Form.Field>
                        <label htmlFor='break_length'>How long roughly is each break?</label>
                                <Form.Field inline>
                                    <input 
                                        className='inline_text'
                                        type='number' 
                                        name='break_length' 
                                        value={break_length}
                                        onChange={this.handleChangeForNumbers}
                                        required
                                    /> 
                                    <label>minutes</label>
                                </Form.Field>
                        </Form.Field>
                    </div>}
                    <input type='submit' value='Submit'/>
                </Form>
            </div>
        )
    }
}

export default Questionnaire;