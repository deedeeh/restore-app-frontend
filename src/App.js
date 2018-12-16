import React, { Component } from 'react';

import Authentication from './containers/Authentication';
import About from './components/About'
import Questionnaire from './components/Questionnaire'
import QuestionnaireFeedback from './components/QuestionnaireFeedback';
import Dashboard from './containers/Dashboard';
import Evaluation from './components/Evaluation';
import Navigation from './components/Navigation';

import './css/App.css'
import './css/Navigation.css'


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navigation pageWrapId={"page-wrap"} outerContainerId={"Nav-app"}/>
          <h1>RESTore</h1>
        </header>
        <div className='styling_sections' id="page-wrap">
          <Authentication />
          <hr />
          <About />
          <hr />
          <Questionnaire />
          <hr />
          <QuestionnaireFeedback />
          <hr />
          <Dashboard />
          <hr />
          <Evaluation />
        </div>
      </div>
    );
  }
}

export default App;
