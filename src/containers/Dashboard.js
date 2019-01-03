import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import Chart from '../components/Chart'
import Notification from '../components/Notification'

import '../css/Dashboard.css'
import BreakInfo from '../components/BreakInfo';

const getTodaysDateString = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

const timeStringToObject = (timeString) => {
    const times = timeString.split(':')
    return {
      hours: parseInt(times[0]),
      minutes: parseInt(times[1])
    }
  }
  
  // TODO: Rename to secondsSince
  const secondsSince = (from) => {
    const fromObj = timeStringToObject(from)
    const now = new Date(Date.now())
    const nowString = `${now.getHours()}:${now.getMinutes()}`
    const nowObj = timeStringToObject(nowString)
    const hours = nowObj.hours - fromObj.hours;
    const minutes = nowObj.minutes - fromObj.minutes + (now.getSeconds() / 60);
    return (((hours * 60) + minutes) * 60);
  }

  const minTommss = (minutes) => {
    const sign = minutes < 0 ? "-" : "";
    const min = Math.floor(Math.abs(minutes));
    const sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
   }

const ssTommss = (seconds) => {
    const sign = seconds < 0 ? "-" : "";
    const min = Math.abs(Math.floor(seconds / 60));
    const sec = Math.abs(Math.floor(seconds % 60));

    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

class Dashboard extends Component {
    state = {
        timestamp: '',
        secondsRemainingInBreak: undefined,
        secondsToNextBreak: undefined,
        percentage: undefined,
        interval: undefined,
        flag: false,
        nextBreak: undefined,
        breaks: []
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
        //         secondsRemainingInBreak: this.getsecondsRemainingInBreak(user.questionnaire)
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

    updateBreaks = (data, cb) => {
        fetch('http://localhost:3000/api/v1/breaks', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(storedBreaks => {

            let min = (data.breaks_interval / 60)
            let totalMins = 24 * 60
            const breaks = []
            while (min < totalMins) {
                const storedBreak = storedBreaks.find(b => b.start === min * 60 && b.end === (min + data.break_length) * 60)
                if (storedBreak) {
                    breaks.push(storedBreak)
                } else {
                    breaks.push(
                        {
                            start: min * 60,
                            end: (min + data.break_length) * 60
                        }
                    )
                }
                min += (data.breaks_interval / 60) + data.break_length
            }
            this.setState({
                breaks
            }, cb)
        })
    }

    componentDidMount() {
        this.getDate();
        const { user } = this.props

        this.updateBreaks(
            user.questionnaire,
            () => this.setState({
                nextBreak: this.getNextBreak(user.questionnaire)
            },
                () => this.setState({
                    secondsRemainingInBreak: this.getsecondsRemainingInBreak(user.questionnaire),
                    secondsToNextBreak: this.getSecondsToNextBreak(user.questionnaire),
                    percentage: this.getPercentageToNextBreak(user.questionnaire)
                })
            )
        )

        clearInterval(this.state.interval)

        const interval = setInterval(() => {
            this.setState({
                nextBreak: this.getNextBreak(user.questionnaire)
            }, () => this.setState({
                secondsRemainingInBreak: this.getsecondsRemainingInBreak(user.questionnaire),
                secondsToNextBreak: this.getSecondsToNextBreak(user.questionnaire),
                percentage: this.getPercentageToNextBreak(user.questionnaire)
            }))
        }, 1000)

        this.setState({ interval })
    }
    
    postBreak = breakToPost => {

        

        return fetch('http://localhost:3000/api/v1/breaks', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ 
                    break: {
                        ...breakToPost,
                        the_date: getTodaysDateString()
                    }
                })
            })
            .then(resp => resp.json())
    }

    getDate = () => {
        const timestamp = new Date().toLocaleString();
        this.setState({ timestamp });
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    getPercentageToNextBreak = (data) => {
        const seconds = this.getSecondsToNextBreak(data)
        return Math.ceil((seconds / (data.breaks_interval * 60 )) * 100)
      }

    getNextBreak = (data) => this.state.breaks.find(b => !b.completed && b.start > secondsSince(data.working_hours_from))

    incompleteBreak = breakToComplete => {
        this.setState({
            breaks: this.state.breaks.map(b => {
                if (b.start !== breakToComplete.start) return b;
                b.completed = false;
                this.postBreak(b);
                return b;
            })
        }, () => this.setState({ nextBreak: this.getNextBreak(this.props.user.questionnaire)}))
    }

    completeBreak = breakToComplete => {
        this.setState({
            breaks: this.state.breaks.map(b => {
                if (b.start !== breakToComplete.start) return b;
                b.completed = true;
                this.postBreak(b);
                return b;
            })
        }, () => this.setState({ nextBreak: this.getNextBreak(this.props.user.questionnaire)}))
    }

    //   TODO: rename to getSecondsToNextBreak

    currentlyInBreak = data => {
        const currentSecond = secondsSince(data.working_hours_from)
        return this.state.breaks.filter(b => currentSecond > b.start && currentSecond < b.end).length > 0
    }

    getSecondsToNextBreak = data => {
        const currentSecondFromStart = secondsSince(data.working_hours_from)
        if (this.currentlyInBreak(data)) {
            return this.state.nextBreak.start - currentSecondFromStart - (data.break_length * 60)
        } else {
            return this.state.nextBreak.start - currentSecondFromStart
        }
    }

    getsecondsRemainingInBreak = data => {
        const currentSecondFromStart = secondsSince(data.working_hours_from)
        return Math.abs((data.break_length * 60) - (this.state.nextBreak.end - currentSecondFromStart))
    }

    getPercentage = (data) => {
        const { user } = this.props
        
        return this.state.secondsToNextBreak <= 0 ? 
        100 * (this.state.secondsRemainingInBreak / (user.questionnaire.break_length * 60)) : 
        this.state.percentage
    }

    getHowManyBreaksInDay = (data) => {
        const totalBreaks = Math.round((this.calculateHours(data.working_hours_from, data.working_hours_to) - 60) / (data.breaks_interval / 60 + data.break_length))
        return totalBreaks
    }
    
    getPastBreaks = () => this.state.breaks.filter(b => b.start < secondsSince(this.props.user.questionnaire.working_hours_from))

    secondsThroughDayToTime = seconds => {
        const d = new Date()
        const startTime = this.props.user.questionnaire.working_hours_from
        const timeObj = timeStringToObject(startTime)
        d.setHours(timeObj.hours)
        d.setMinutes(timeObj.minutes)
        d.setSeconds(seconds)
        return d.toTimeString().substring(0, 5)
    }

    render() {
        console.log(this.state.secondsToNextBreak);
        const { user } = this.props
        return (
            <div>
                <h2 className='hello_user'>Hello {this.capitalize(user.name)}</h2>
                <h4 className='user_job'>{this.capitalize(user.questionnaire.job_title)}</h4>
                <p className='date'>{new Date().toDateString()}</p>
                <div>
                    <Chart 
                        nextBreak={this.state.nextBreak}
                        secondsRemainingInBreak={this.state.secondsRemainingInBreak} 
                        secondsToNextBreak={this.state.secondsToNextBreak} 
                        percentage={this.getPercentage(user.questionnaire)} 
                        totalBreaksInDay={this.getHowManyBreaksInDay(user.questionnaire)}
                        minTommss={minTommss}
                        ssTommss={ssTommss}
                        flag={this.state.flag}
                    />
                </div>
                <div className='breaks_messages'>
                    {
                        this.getPastBreaks().length > 0 &&
                        this.getPastBreaks()
                        .sort((a, b) => b.start - a.start)
                        .map(b => {
                            return <BreakInfo 
                                {...b}
                                start={this.secondsThroughDayToTime(b.start)}
                                end={this.secondsThroughDayToTime(b.end)}
                                completeBreak={() => this.completeBreak(b)}
                                incompleteBreak={() => this.incompleteBreak(b)}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard;


//     render() {
//         console.log(this.state.minutesToNextBreak);
//         const { user } = this.props
//         return (
//             <div className='dashboard'>
//                 <h2 className='hello_user'>Hello {this.capitalize(user.name)}</h2>
//                 <h4>{this.capitalize(user.questionnaire.job_title)}</h4>
//                 <p className='date'>{new Date().toDateString()}</p>
//                 <div>
//                     <Chart 
//                         minutesRemainingInBreak={this.state.minutesRemainingInBreak} 
//                         minutesToNextBreak={this.state.minutesToNextBreak} 
//                         percentage={this.getPercentage(user.questionnaire)} 
//                         totalBreaksInDay={this.getHowManyBreaksInDay(user.questionnaire)}
//                         minTommss={minTommss}
//                         ssTommss={ssTommss}
//                         flag={this.state.flag}
//                     />
//                 </div>
//                 <Button fluid className='dashboard_button' onClick={this.handleFlagButtonClick} type='submit'>Take Break</Button>
//             </div>
//         )
//     }
// }

// export default Dashboard;

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
