import React, { Component } from 'react'

import Chart from '../components/Chart'

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
        working_hours_in_minutes: null,
        minutesRemainingInBreak: undefined,
        minutesToNextBreak: undefined,
        percentage: undefined
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
        const { user } = this.props

        this.setState({
            minutesRemainingInBreak: this.getMinutesRemainingInBreak(user.questionnaire),
            minutesToNextBreak: this.getMinutesToNextBreak(user.questionnaire),
            percentage: this.getPercentageToNextBreak(user.questionnaire)
        })

        setInterval(() => {
            this.setState({
                minutesRemainingInBreak: this.getMinutesRemainingInBreak(user.questionnaire),
                minutesToNextBreak: this.getMinutesToNextBreak(user.questionnaire),
                percentage: this.getPercentageToNextBreak(user.questionnaire)
            })
        }, 100)
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

    getPercentage(data) {
        const { user } = this.props
        const breakTotal = data.breaks_interval + data.break_length
        return this.state.minutesToNextBreak <= 0 ? 
        100 * (this.state.minutesRemainingInBreak / user.questionnaire.break_length) : 
        this.state.percentage
    }

    decimalsToSeconds = minutes => {
        // 10.5
        // return '10:30'
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h3>Welcome {this.capitalize(user.name)} to your dashboard</h3>
                <h4>{this.capitalize(user.questionnaire.job_title)}</h4>
                <div className='dateTime_container'> 
                    <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=small&timezone=Europe%2FLondon" width="100%" height="90" frameborder="0" seamless>
                    </iframe> 
                </div>
                <Chart minutesRemainingInBreak={minTommss(this.state.minutesRemainingInBreak)} minutesToNextBreak={minTommss(this.state.minutesToNextBreak)} percentage={this.getPercentage(user.questionnaire)} />
            </div>
        )
    }
}

export default Dashboard;