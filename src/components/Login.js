import React from 'react';
import Profile from './Profile.js';

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
        name: this.state.username
      })
    }
    fetch(USERS, reqObj)
    .then(resp => resp.json())
    .then((user) => {
      this.props.setUser(user)
      this.props.history.push('/home');
    })
  }

  render(){
    return(
      <div className="login-container">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <h1>Login / Sign in</h1>
          <div>
            <label htmlFor="username">Username: </label>
            <input onChange={(e) => this.handleUsernameChange(e)} value={this.state.username} type="text" name="username" placeholder="Username" />
          </div>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
