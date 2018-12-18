import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import Authentication from './containers/Authentication';
import About from './components/About'
import Questionnaire from './components/Questionnaire'
import QuestionnaireFeedback from './components/QuestionnaireFeedback';
import Dashboard from './containers/Dashboard';
import Evaluation from './components/Evaluation';
import Navigation from './components/Navigation';
import Notification from './components/Notification';

import './css/App.css'
import './css/Navigation.css'


class App extends Component {
  state = {
    active_user_id: 0
  }

  validate = () => {
    return fetch('http://localhost:3000/api/v1/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(resp => resp.json())
  }

  postLoginDetails = (user_credentials) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...user_credentials })
    })
      .then(resp => resp.json())
      .then(data => {
          if (data.id) {
            // this.setState({active_user_id: data.id})
            localStorage.setItem('activeUser', data.id)
            localStorage.setItem('token', data.token)
            this.props.history.push('/dashboard')
          }
      })
  }

  setUserId = (active_user_id) => {
    // this.setState({ active_user_id })
    localStorage.setItem('activeUser', active_user_id)
  }

  // postSignupDetails = (user_credentials) => {
  //   fetch('http://localhost:3000/api/v1/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ ...user_credentials })
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //         if (data.id) {
  //           this.setState({active_user_id: data.id})
  //           localStorage.setItem('token', data.token)
  //           this.props.history.push('/about')
  //         }
  //     })
  // }

  render() {
    console.log('id', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <Navigation pageWrapId={"page-wrap"} outerContainerId={"Nav-app"} />
          <h1>RESTore</h1>
        </header>
        <div className='styling_sections' id="page-wrap">
          {localStorage.getItem('token') ? <Switch>
            <Route exact path='/about' component={About} />
            <Route exact path='/questionnaire' component={Questionnaire} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/feedback' component={QuestionnaireFeedback} />
          </Switch>
            : <Authentication setUserId={this.setUserId} postLoginDetails={this.postLoginDetails} />
          }
        </div>
      </div>
    );
  }
}



export default withRouter(App);
