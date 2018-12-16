import React from 'react'

import '../index.css'

const Evaluation = (props) => {
    return (
        <div>
            <p>Well Done!</p>
            <p>Your average percent today is 90%</p>
            <h4 className='align-left'>Tips</h4>
            <ul className='align-left'>
                <li>Next time try to take all breaks.</li>
            </ul>
        </div>
    )
}

export default Evaluation;