import React from 'react';
import Profile from './Profile.js';

const USERS = 'https://slang-challenge-backend.herokuapp.com/users';

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      users:[]
    }
  }

  componentDidMount = () => {
    fetch(USERS)
    .then(resp=> resp.json())
    .then(usersData => this.setState({
      users: usersData
    }))
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  validateUser = () => {
    return this.state.users.find((user) => {
      return user.name === this.state.username
    })
  }

  renderCreateUser = () => {
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username,
        img_url: null
      })
    }
    fetch(USERS, reqObj)
    .then(resp => resp.json())
    .then(user => {this.props.history.push('/home')})
    this.setState({
      username: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = this.validateUser();
    if (existingUser === undefined){
      this.renderCreateUser();
    } else if(existingUser.name === this.state.username){
      this.props.history.push('/home');
    }
  }

  handleInputName = () => {
    console.log('hand this name to proifle', this.state.username);
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
      <Profile handleInputName={this.handleInputName()} />
      </div>
    )
  }
}
