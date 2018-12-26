import React from 'react'
import '../index.css'

class Notification extends React.Component {

    render () {
        return (
            <div className='notification'>
                <p>It is time for your - 1st - break</p>
                <button>OK</button>
                <button>Snooze</button>
            </div>
        )
    }
}

export default Notification;