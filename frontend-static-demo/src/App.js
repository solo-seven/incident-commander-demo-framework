import React from 'react';
import DataFetcher from "./components/DataFetcher";
import Quizzer from "./components/Quizzer";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataFetcher />
        <img src={logo} className="App-logo" alt="logo" />
        <Quizzer />
      </header>
    </div>
  );
}

export default App;
