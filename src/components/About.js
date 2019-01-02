import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react'

import '../css/About.css'

const About = () => {
    return (
        <div>
            <Container>
                <Header as='h2' textAlign='center'>Restore reminds you to take breaks regularly and much more.</Header>
                <p className='app_intro'>Restore helps you during a busy day at work when you need to be reminded to take break, drink the required amount of water and maybe having a nice coffee. Just as simple as filling the questionnaire to know a little bit about you and your routine and few clicks and voilà.</p>
                <Button fluid className='about_button'><Link to='/questionnaire'>Start</Link></Button>
            </Container>
        </div>
    )
}

export default About;