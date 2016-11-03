import React, { Component } from 'react';
import Plot from './Plot.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>NYC Marathon Data</h1>
        <Plot />
      </div>
    );
  }
}

export default App;
