import React from 'react'
import { withRouter } from 'react-router'

import '../css/Questionnaire.css'

// I need to pass the state from Questionnaire to here to make comparison between answers and the suggestions

const QuestionnaireFeedback = (props) => {

    const handleClick = () => {
        props.history.push('/dashboard')
    }

    return( 
        <div>
            <p>After taking a closer look to your answers, RESTore cares about your productity and wellbeing so here are few suggestions:</p>
            <div>Check how many hours the user work? take_breaks? how many and how long each? EVALUATE</div>
            <button onClick={handleClick}>My Dashboard</button>
        </div>
    )
}

export default withRouter(QuestionnaireFeedback);

