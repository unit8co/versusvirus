import React from 'react';
import logo from './logo.svg';
import { HomeView } from "./views/homepage";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Community built Medical Equipment</p>
      </header>
      <body className="App-body">
        <HomeView></HomeView>
      </body>
    </div>
  );
}

export default App;
