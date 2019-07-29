import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import GameBoard from './components/GameBoard';

import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <React.Fragment>
        <NavBar />
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/gameboard' component={GameBoard} />
      </React.Fragment>
    </Router>
    </div>
  );
}

export default App;
