import React, { Component } from 'react'

import CircularProgressbar from "react-circular-progressbar";

import '../css/Chart.css'

class Chart extends Component {
    state = {
        percentage: 100
    }

    render() {
        const { percentage } = this.props;
        return (
            <div>
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

