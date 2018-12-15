import React, { Component } from 'react';

import Authentication from './containers/Authentication';
import About from './components/About'
import Questionnaire from './components/Questionnaire'

import './css/App.css'

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
      </div>
    );
  }
}

export default App;
