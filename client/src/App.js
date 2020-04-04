import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CONFIG } from './config.js';

class App extends Component {
  constructor(props) {
		super(props);
    this.state = {
      time: ''
    };
  }
 


  componentDidMount() { 
    fetch(CONFIG.API_BASE_URL + '/time') 
    .then(data => data.json()) 
    .then(response => this.setState({time: response.time}))
  }
  

  render() {  
    return (
      <div>
          <h1>Covid app</h1>
          <ul>
            {this.state.time}
          </ul>
      </div>
    );
  }
}

export default App;