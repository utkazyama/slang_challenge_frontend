import React from 'react';
import Profile from './Profile.js';	
import logo from '../slang_challenge_logo.png';

const USERS = 'https://slang-challenge-backend.herokuapp.com/users';
const USERS_DEV = 'http://localhost:3001/users';


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      navDisplay: false
    }
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username,
        total_score: 0,
        total_game_played: 0,
        accuracy_rate: 0,
        img_url: "https://www.shareicon.net/download/2015/08/14/84875_add_512x512.png"
      })
    }
    fetch(USERS_DEV, reqObj)
    .then(resp => resp.json())
    .then((user) => {
      this.props.setUser(user)
      this.props.history.push('/home');
    })
  }

  render(){
    return(
      <div className="login-container">
        <div className="logo-img-container">
          <img src={logo} className="login-logo" alt="logo" />
        </div>
        <div className="form-container">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h1>Login / Sign in</h1>
            <div>
              <label htmlFor="username">Username: </label>
              <input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} type="text" name="username" placeholder="Username" />
            </div>
            <br />
            <input className="login-btn" type="submit" value="Login" />
          </form>
        </div>
      </div>
    )
  }
}
