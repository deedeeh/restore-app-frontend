import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

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
  
  // TODO: Rename to secondsSince
  const minutesSince = (from) => {
    const fromObj = timeStringToObject(from)
    const now = new Date(Date.now())
    const nowString = `${now.getHours()}:${now.getMinutes()}`
    const nowObj = timeStringToObject(nowString)
    const hours = nowObj.hours - fromObj.hours;
    const minutes = nowObj.minutes - fromObj.minutes + (now.getSeconds() / 60);
    return (hours * 360) + minutes * 60;
  }

  const minTommss = (minutes) => {
    const sign = minutes < 0 ? "-" : "";
    const min = Math.floor(Math.abs(minutes));
    const sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
   }

const ssTommss = (seconds) => {
    const sign = seconds < 0 ? "-" : "";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

class Dashboard extends Component {
    state = {
        timestamp: '',
        minutesRemainingInBreak: undefined,
        minutesToNextBreak: undefined,
        percentage: undefined,
        interval: undefined,
        flag: false
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

    handleFlagButtonClick = () => {
        const { user } = this.props
        this.setState({
            flag: !this.state.flag
        })
        clearInterval(this.state.percentage)
        clearInterval(this.state.interval)
        // setInterval(() => 
        //     this.setState({
        //         minutesRemainingInBreak: this.getMinutesRemainingInBreak(user.questionnaire)
        //     })
        // )
    }

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
            minutesToNextBreak: this.getSecondsToNextBreak(user.questionnaire),
            percentage: this.getPercentageToNextBreak(user.questionnaire)
        })

        clearInterval(this.state.interval)
        const interval = setInterval(() => {
            this.setState({
                minutesRemainingInBreak: this.getMinutesRemainingInBreak(user.questionnaire),
                minutesToNextBreak: this.getSecondsToNextBreak(user.questionnaire),
                percentage: this.getPercentageToNextBreak(user.questionnaire)
            })
        }, 1000)
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
        const minutesToNextBreak = this.getSecondsToNextBreak(data)
        return Math.ceil((minutesToNextBreak / data.breaks_interval) * 100)
      }

    //   TODO: rename to getSecondsToNextBreak

    getSecondsToNextBreak = data => {
        const currentMinuteFromStart = minutesSince(data.working_hours_from)
        let i = 0;
        
        const breakTotal = data.breaks_interval + data.break_length * 60
        while(currentMinuteFromStart > i * breakTotal) {
            i++;
        }
        const prevBreakEndMinute = (i - 1) * breakTotal;
        
        return data.breaks_interval - (currentMinuteFromStart - prevBreakEndMinute);
    }

    getMinutesRemainingInBreak = data => {
        return this.getSecondsToNextBreak(data) + data.break_length * 60
    }

    getPercentage = (data) => {
        const { user } = this.props
        
        return this.state.minutesToNextBreak <= 0 ? 
        100 * (this.state.minutesRemainingInBreak / (user.questionnaire.break_length * 60)) : 
        this.state.percentage
    }

    getHowManyBreaksInDay = (data) => {
        const totalBreaks = Math.round((this.calculateHours(data.working_hours_from, data.working_hours_to) - 60) / (data.breaks_interval / 60 + data.break_length))
        return totalBreaks
    } 

    render() {
        console.log(this.state.minutesToNextBreak);
        const { user } = this.props
        return (
            <div className='dashboard'>
                <h2 className='hello_user'>Hello {this.capitalize(user.name)}</h2>
                <h4>{this.capitalize(user.questionnaire.job_title)}</h4>
                <p className='date'>{new Date().toDateString()}</p>
                <div>
                    <Chart 
                        minutesRemainingInBreak={this.state.minutesRemainingInBreak} 
                        minutesToNextBreak={this.state.minutesToNextBreak} 
                        percentage={this.getPercentage(user.questionnaire)} 
                        totalBreaksInDay={this.getHowManyBreaksInDay(user.questionnaire)}
                        minTommss={minTommss}
                        ssTommss={ssTommss}
                        flag={this.state.flag}
                    />
                </div>
                <Button fluid className='dashboard_button' onClick={this.handleFlagButtonClick} type='submit'>Take Break</Button>
            </div>
        )
    }
}

export default Dashboard;

// 1. when mounting app set timers for work and break to 1h and 15mins (from props)
// 2. check if break or work time ? work - set timer for work running, leave break timer off.
//     break - set timer for break running, leave timer for work alone.
// 3. reaches 0? stop ticking. don't go into negative numbers. ALso, notify the user. Time to rest. mofo.
// 4. if clicked button - do 3 things:
//  4.1 change status of flag from work to rest / rest to work.
//  4.2 reset both timers to their initial values.
//  4.3 start other timer running.
// 
// 
// 
// 
// 
// 
// 
