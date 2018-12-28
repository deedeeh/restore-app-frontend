import React, { Component } from 'react'

import CircularProgressbar from "react-circular-progressbar";

import '../css/Chart.css'

class Chart extends Component {
    state = {
        percentage: 100
    }

    render() {
        const { percentage, minutesToNextBreak, minutesRemainingInBreak, totalBreaksInDay, minTommss, ssTommss } = this.props;
        return (
            <div>
                <div>
                    {
                        minutesToNextBreak <= 0 ? 
                        `Take a break! ${ssTommss(minutesRemainingInBreak)} minutes remaining` :
                        `${ssTommss(minutesToNextBreak)} minutes until your next break`
                    }
                </div>
                <div className='chart_breaks'>
                    <CircularProgressbar
                        className='chart'
                        initialAnimation={true}
                        counterClockwise={false}
                        percentage={percentage}
                        text={`${Math.floor(percentage)}%`}
                    />
                    <p className='total_breaks'>{}/{totalBreaksInDay} breaks</p>
                </div>
            </div>
        )
    }
}

export default Chart;

