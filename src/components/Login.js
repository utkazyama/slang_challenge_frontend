import React from 'react';

export default class Login extends React.Component {
  render(){
    return(
      <div className="login-container">
        <form>
          <h1>Login / Sign in</h1>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <br/>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
