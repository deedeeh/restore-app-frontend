import React, { Component } from 'react';

import Authentication from './containers/Authentication';
import About from './components/About'
import Questionnaire from './components/Questionnaire'

import './css/App.css'
import QuestionnaireFeedback from './components/QuestionnaireFeedback';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>RESTore</h1>
        </header>
        <Authentication />
        <hr />
        <About />
        <hr />
        <Questionnaire />
        <hr />
        <QuestionnaireFeedback />
      </div>
    );
  }
}

export default App;
