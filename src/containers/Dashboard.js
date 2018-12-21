import React, { Component } from 'react'

import Chart from '../components/Chart'

const timeStringToObject = (timeString) => {
    const times = timeString.split(':')
    return {
      hours: parseInt(times[0]),
      minutes: parseInt(times[1])
    }
  }
  
  const startEndToMinutes = (start, end) => {
    const startObj = timeStringToObject(start);
    const endObj = timeStringToObject(end);
    const hours = endObj.hours - startObj.hours;
    const minutes = endObj.minutes - startObj.minutes;
    return (hours * 60) + minutes;
  }
  
  const minutesSince = (from) => {
    const fromObj = timeStringToObject(from)
    const now = new Date(Date.now())
    const nowString = `${now.getHours()}:${now.getMinutes()}`
    const nowObj = timeStringToObject(nowString)
    const hours = nowObj.hours - fromObj.hours;
    const minutes = nowObj.minutes - fromObj.minutes;
    return (hours * 60) + minutes;
  }

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

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getPercentageToNextBreak = (data) => {
        const totalMinutesInDay = startEndToMinutes(data.working_hours_from, data.working_hours_to)
        const currentMinuteFromStart = minutesSince(data.working_hours_from)
        const breakTotal = data.breaks_interval + data.break_length
        return 100 - ((currentMinuteFromStart / breakTotal - Math.floor(currentMinuteFromStart / breakTotal)) * 100)
      }

    render() {
        const { user } = this.props
        return (
            <div>
                <h3>Welcome {this.capitalize(user.name)} to your dashboard</h3>
                <h4>Job title</h4>
                <div className='dateTime_container'> 
                    <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=small&timezone=Europe%2FLondon" width="100%" height="90" frameborder="0" seamless>
                    </iframe> 
                </div>
                <Chart percentage={this.getPercentageToNextBreak(user.questionnaire)} />
            </div>
        )
    }
}

// {this.capitalize(user.questionnaire.job_title)}

export default Dashboard;