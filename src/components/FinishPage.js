import React, {Component} from 'react';


export default class FinishPage extends Component {
  render() {
    return (
      <div>
        <h2>Great Job!!!</h2>
        <h1>Total Score: {this.props.score}</h1>
      </div>
    )
  }
}
