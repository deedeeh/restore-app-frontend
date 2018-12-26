import React from 'react'
import '../index.css'

const Notification = (props) => {

    const handleOkBtn = () => {
        props.minutesRemainingInBreak()
    }

    return (
        <div className='notification'>
            <p>It is time for your - 1st - break</p>
            <button onClick={handleOkBtn}>OK</button>
            <button>Snooze</button>
        </div>
    )
}

export default Notification;