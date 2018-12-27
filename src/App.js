import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import Authentication from './containers/Authentication';
import About from './components/About'
import Questionnaire from './components/Questionnaire'
import QuestionnaireFeedback from './components/QuestionnaireFeedback';
import Dashboard from './containers/Dashboard';
import Evaluation from './components/Evaluation';
import Navigation from './components/Navigation';
import Notification from './components/Notification';

import './css/Navigation.css'
import './css/App.css'



class App extends Component {
  state = {
    // active_user_id: 0,
    menuIsOpen: false,
    token: localStorage.getItem('token'),
    activeUser: localStorage.getItem('activeUser') && localStorage.getItem('activeUser') !== 'undefined' ? JSON.parse(localStorage.getItem('activeUser')) : undefined
  }

  validate = () => {
    return fetch('http://localhost:3000/api/v1/validate', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.user) {
        this.setState({
          activeUser: data.user
        })
      }
    })
  }

  componentDidMount() {
    if (this.state.token) this.validate()
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
          if (data.token) {
            this.setState({
              activeUser: data.user,
              // active_user_id: data.user.id,
              token: data.token
            })
            localStorage.setItem('activeUser', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
          
            this.state.activeUser.questionnaire.job_title.length > 0 
            ? this.props.history.push('/dashboard')
            : this.props.history.push('/questionnaire')
          }
      })
  }

  setUser = (activeUser) => {
    this.setState({ activeUser })
    localStorage.setItem('activeUser', JSON.stringify(activeUser))
  }

  handleSignUpResponse = res => {
    if(res.error) {
      const error_msg = res.error
      return error_msg
    } else {
      this.setUser(res.user)
      this.setState({
        token: res.token
      })
      localStorage.setItem('token', res.token)
      this.props.history.push('/about')
      return null
    }
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

  updateQuestionnaire = (questionnaire) => {
    this.setState({
      activeUser: {
        ...this.state.activeUser,
        questionnaire: questionnaire
      }
    })
  }

  render() {
    // console.log('token', this.state.token)
    // console.log('activeUser', this.state.activeUser)
    return (
      <div className="App">
        <header className="App-header">
          <Navigation clickLink={() => this.setState({menuIsOpen: false})} onStateChange={(state) => this.setState({menuIsOpen: state.isOpen}) } isOpen={this.state.menuIsOpen} pageWrapId={"page-wrap"} outerContainerId={"Nav-app"} />
          <h1>RESTore</h1>
        </header>
        <div className='styling_sections' id="page-wrap">
          {(this.state.token && this.state.activeUser) ?
          <Switch>
            <Route exact path='/about' component={About} />
            <Route exact path='/questionnaire' component={(props) => <Questionnaire updateQuestionnaire={this.updateQuestionnaire} token={this.state.token} user={this.state.activeUser} {...props} />} />
            <Route exact path='/dashboard' component={(props) => <Dashboard {...props} token={this.state.token} user={this.state.activeUser} />} />
            <Route exact path='/feedback' component={QuestionnaireFeedback} />
            <Route exact path='/history' component={() => <h2>Coming Soon...</h2>} />
            <Route component={() => 
              <div>
                <h2>Not Found</h2>
                <Link to='/about'>Back to about</Link>
              </div>
              }
            />
          </Switch>
            : <Authentication handleSignUpResponse={this.handleSignUpResponse} setUser={this.setUser} postLoginDetails={this.postLoginDetails} />
          }
        </div>
      </div>
    );
  }
}



export default withRouter(App);
