import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import GameBoard from './components/GameBoard';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  handleLogout = () => {
    this.setState({
      user: {}
    })
  }

  render(){
    return (
      <div className="App">
      <Router>
        <React.Fragment>
          <NavBar handleLogout={() => this.handleLogout()} user={this.state.user} />
          <Route exact path='/' render={(routeProps)=> {
            return(<Login {...routeProps} setUser={this.setUser} />)
          }} />
          <Route exact path='/home' render={(routeProps)=> {
            return(< Home {...routeProps} user={this.state.user} />)
          }} />
          <Route exact path='/profile' render={(routeProps)=> {
            return(< Profile {...routeProps} user={this.state.user} />)
          }} />
          <Route exact path='/gameboard' component={GameBoard} />
        </React.Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
