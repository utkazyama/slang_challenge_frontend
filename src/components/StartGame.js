import React, {Component} from 'react';


export default class StartGame extends Component {
  render() {
    return (
      <div>
        <button onClick={()=> this.props.handleStartGame()} >Start Game</button>
      </div>
    )
  }
}
