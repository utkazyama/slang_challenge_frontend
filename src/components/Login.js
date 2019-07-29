import React from 'react';

export default class Login extends React.Component {
  render(){
    return(
      <form>
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <input type="submit" value="Login" />
      </form>
    )
  }
}
