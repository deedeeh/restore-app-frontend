import React, { Component } from 'react'

import Chart from '../components/Chart'

class Dashboard extends Component {
    state = {
        timestamp: '',
    }

    componentDidMount() {
        this.getDate();
    }

    getDate = () => {
        const timestamp = new Date().toLocaleString();
        this.setState({ timestamp });
    }

    render() {
        return (
            <div>
                <h3>Welcome -Name of the user- to your dashboard</h3>
                <h4>Job Title here</h4>
                <div className='dateTime_container'> 
                    <iframe src="https://www.zeitverschiebung.net/clock-widget-iframe-v2?language=en&size=small&timezone=Europe%2FLondon" width="100%" height="90" frameborder="0" seamless>
                    </iframe> 
                </div>
                <Chart />
            </div>
        )
    }
}

export default Dashboard;