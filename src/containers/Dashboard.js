import React, { Component } from 'react'

import Chart from '../components/Chart'
import Notification from '../components/Notification'

import '../css/Dashboard.css'

const timeStringToObject = (timeString) => {
    const times = timeString.split(':')
    return {
      hours: parseInt(times[0]),
      minutes: parseInt(times[1])
    }
  }
  
  const minutesSince = (from) => {
    const fromObj = timeStringToObject(from)
    const now = new Date(Date.now())
    const nowString = `${now.getHours()}:${now.getMinutes()}`
    const nowObj = timeStringToObject(nowString)
    const hours = nowObj.hours - fromObj.hours;
    const minutes = nowObj.minutes - fromObj.minutes + (now.getSeconds() / 60);
    return (hours * 60) + minutes;
  }

  const minTommss = (minutes) => {
    const sign = minutes < 0 ? "-" : "";
    const min = Math.floor(Math.abs(minutes));
    const sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
    
   }

class Dashboard extends Component {
    state = {
        timestamp: '',
        minutesRemainingInBreak: undefined,
        minutesToNextBreak: undefined,
        percentage: undefined,
        showNotification: false,
        interval: undefined
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

        return dayDuration
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    componentDidMount() {
        this.getDate();
        const { user } = this.props

        this.setState({
            minutesRemainingInBreak: this.getMinutesRemainingInBreak(user.questionnaire),
            minutesToNextBreak: this.getMinutesToNextBreak(user.questionnaire),
            percentage: this.getPercentageToNextBreak(user.questionnaire)
        })

        clearInterval(this.state.interval)
        const interval = setInterval(() => {
            this.setState({
                minutesRemainingInBreak: this.getMinutesRemainingInBreak(user.questionnaire),
                minutesToNextBreak: this.getMinutesToNextBreak(user.questionnaire),
                percentage: this.getPercentageToNextBreak(user.questionnaire)
            })
        }, 100)
        this.setState({ interval })
    }


    getDate = () => {
        const timestamp = new Date().toLocaleString();
        this.setState({ timestamp });
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getPercentageToNextBreak = (data) => {
        const minutesToNextBreak = this.getMinutesToNextBreak(data)
        return (minutesToNextBreak / data.breaks_interval) * 100
      }

    getMinutesToNextBreak = data => {
        const currentMinuteFromStart = minutesSince(data.working_hours_from)
        let i = 0;
        const breakTotal = data.breaks_interval + data.break_length
        while(currentMinuteFromStart > i * breakTotal) {
            i++;
        }
        const prevBreakEndMinute = (i - 1) * breakTotal;
        
        return data.breaks_interval - (currentMinuteFromStart - prevBreakEndMinute);
    }

    getMinutesRemainingInBreak = data => {
        return this.getMinutesToNextBreak(data) + data.break_length
    }

    getPercentage = (data) => {
        const { user } = this.props
        return this.state.minutesToNextBreak <= 0 ? 
        100 * (this.state.minutesRemainingInBreak / user.questionnaire.break_length) : 
        this.state.percentage
    }

    getHowManyBreaksInDay = (data) => {
        const totalBreaks = Math.round((this.calculateHours(data.working_hours_from, data.working_hours_to) - 60) / (data.breaks_interval + data.break_length))
        return totalBreaks
    } 

    render() {
        const { user } = this.props
        return (
            <div>
                <h3>Welcome {this.capitalize(user.name)} to your dashboard</h3>
                <h4>{this.capitalize(user.questionnaire.job_title)}</h4>
                <p>{new Date().toLocaleDateString()}</p>
                <div>
                    <Chart 
                        minutesRemainingInBreak={this.state.minutesRemainingInBreak} 
                        minutesToNextBreak={this.state.minutesToNextBreak} 
                        percentage={this.getPercentage(user.questionnaire)} 
                        totalBreaksInDay={this.getHowManyBreaksInDay(user.questionnaire)}
                        minTommss={minTommss}
                    />
                </div>
                <Notification />
                
            </div>
        )
    }
}

export default Dashboard;