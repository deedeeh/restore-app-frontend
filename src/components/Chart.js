import React, { Component } from 'react'

import CircularProgressbar from "react-circular-progressbar";

import '../css/Chart.css'

class Chart extends Component {
    state = {
        percentage: 100
    }

    render() {
        const { percentage } = this.state;
        return (
            <div>
                <CircularProgressbar
                    initialAnimation={true}
                    counterClockwise={false}
                    percentage={this.state.percentage}
                    text={`${this.state.percentage}%`}
                />
            </div>
        )
    }
}

export default Chart;

