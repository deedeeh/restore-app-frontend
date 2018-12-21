import React, { Component } from 'react'

import CircularProgressbar from "react-circular-progressbar";

import '../css/Chart.css'

class Chart extends Component {
    state = {
        percentage: 100
    }

    render() {
        const { percentage, minutesToNextBreak, minutesRemainingInBreak } = this.props;
        return (
            <div>
                <div>
                    {
                        minutesToNextBreak <= 0 ? 
                        `Take a break! ${minutesRemainingInBreak} minutes remaining` :
                        `${minutesToNextBreak} minutes until your next break`
                    }
                </div>
                <CircularProgressbar
                    initialAnimation={true}
                    counterClockwise={false}
                    percentage={percentage}
                    text={`${Math.floor(percentage)}%`}
                />
            </div>
        )
    }
}

export default Chart;

