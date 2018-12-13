import React, { Component } from 'react';
import Authentication from './components/Authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>RESTore</h1>
        </header>
        <Authentication />
      </div>
    );
  }
}

export default App;
