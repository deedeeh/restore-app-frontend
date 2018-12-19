import React, { Component } from 'react'

import Chart from '../components/Chart'

class Dashboard extends Component {
    state = {
        timestamp: '',
        working_hours_in_minutes: null,
    }
    
    // getQuestionnaireInfo = () => {
    //     return fetch('http://localhost:3000/api/v1/questionnaire', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('token')
    //         }
    //     })
    //     .then(resp => resp.json())
    //     .then((data) => {
    //         if (data.id) {
    //           localStorage.setItem('activeUser', data.id)
    //           localStorage.setItem('token', data.token)
    //           console.log(data)
    //         }
    //     })
    // }

    calculateHours = (start, end) => {
        const startHour = start.split(':');
        const endHour = end.split(':');

        const startHourInMinutes = parseInt(startHour[0]) * 60 + parseInt(startHour[1])
        const endHourInMinutes = parseInt(endHour[0]) * 60 + parseInt(endHour[1])
        
        const dayDuration = (endHourInMinutes - startHourInMinutes);

        this.setState({
            working_hours_in_minutes: dayDuration 
        })
    }

    getResponseFromDB = () => {
        return fetch('http://localhost:3000/api/v1/questionnaire', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        })
        .then(resp => resp.json())
        .then((data) => 
            this.calculateHours(data.working_hours_from, data.working_hours_to)
        )
    }

    componentDidMount() {
        this.getDate();
        this.getResponseFromDB();
    }

    getDate = () => {
        const timestamp = new Date().toLocaleString();
        this.setState({ timestamp });
    }

    render() {
        return (
            <div>
                <h3>Welcome {this.props.user.name} to your dashboard</h3>
                <h4>{this.props.user.questionnaire.job_title}</h4>
                <div className='dateTime_container'> 
                    <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=small&timezone=Europe%2FLondon" width="100%" height="90" frameborder="0" seamless>
                    </iframe> 
                </div>
                <Chart />
            </div>
        )
    }
}

export default Dashboard;