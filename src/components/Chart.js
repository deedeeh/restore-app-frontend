import React, { Component } from 'react'

import CircularProgressbar from "react-circular-progressbar";

import '../css/Chart.css'

class Chart extends Component {
    state = {
        percentage: 100
    }

    render() {
        const { percentage, secondsToNextBreak, secondsRemainingInBreak, totalBreaksInDay, minTommss, ssTommss, flag, nextBreak } = this.props;
        return (
            <div>
                <div className='countdown'>
                    {
                        secondsRemainingInBreak > 0  ? 
                        `Take a break! ${ssTommss(secondsRemainingInBreak)} minutes remaining` :
                        `${ssTommss(secondsToNextBreak)} minutes until your next break`
                    }
                </div>
                {/* <div className='chart_breaks'>
                    <CircularProgressbar
                        className={flag ? (secondsRemainingInBreak > 0 ? 'chart-break' : 'chart-red') : (secondsToNextBreak <= 0 ? 'chart-red' : 'chart')}
                        initialAnimation={true}
                        counterClockwise={false}
                        percentage={percentage}
                        text={`${Math.floor(percentage)}%`}
                    />
                    <p className='total_breaks'>{}/{totalBreaksInDay} breaks</p>
                </div> */}
            </div>
        )
    }
}

// class Chart extends Component {
//     state = {
//         percentage: 100
//     }

//     render() {
//         const { percentage, minutesToNextBreak, minutesRemainingInBreak, totalBreaksInDay, minTommss, ssTommss, flag } = this.props;
//         return (
//             <div>
//                 <div>
//                     {
//                         (minutesToNextBreak <= 0 && flag) ? 
//                         `Take a break! ${ssTommss(minutesRemainingInBreak)} minutes remaining` :
//                         `${ssTommss(minutesToNextBreak)} minutes until your next break`
//                     }
//                 </div>
//                 <div className='chart_breaks'>
//                     <CircularProgressbar
//                         className={flag ? (minutesRemainingInBreak > 0 ? 'chart-break' : 'chart-red') : (minutesToNextBreak <= 0 ? 'chart-red' : 'chart')}
//                         initialAnimation={true}
//                         counterClockwise={false}
//                         percentage={percentage}
//                         text={`${Math.floor(percentage)}%`}
//                     />
//                     <p className='total_breaks'>{}/{totalBreaksInDay} breaks</p>
//                 </div>
//             </div>
//         )
//     }
// }

export default Chart;

