import React from 'react'

import '../index.css'
import { Message, Button } from 'semantic-ui-react';


const BreakInfo = ({ start, end, completed, completeBreak, incompleteBreak }) => {

    return (
        <Message negative={completed === false} positive={completed === true}>
            <Message.Header>{completed === undefined ? 'Did you take this break?' : (completed === true ? 'Break taken!' : 'Not taken')}</Message.Header>
            <div className='timer'>
                {
                    `From ${start} to ${end}`
                }
            </div>
            <br />
        {
            completed === undefined && 
            <>
                <Button onClick={completeBreak}>Yes</Button>
                <Button onClick={incompleteBreak}>No</Button>
            </> 
        }
        </Message>
    )
}

export default BreakInfo;