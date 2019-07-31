import React, {Component} from 'react';


export default class StartGame extends Component {
  render() {
    return (
      <div className="start-game">
         <div className="guide">
              <h2 className="start-title">Test your knowledge about slang with this Mini Game</h2>
              <br/>
            <div className="rules">
            <h3 className="rule-text">Rules</h3>
              <p>Blue cards provide slangs and Pink cards provide definition of slangs. Choose the matching pair of cards in 30 seconds. when you find the correct pair of cards you will earn 20 points. If you choose an incorrect pair, 20 points will be deducted.</p>
                <br/>
              <p>🔔: Click to receive a hint. You will get a random penalty.</p>
                <br/>
              <p>↩: Back to display phrases.</p>
            <br/>
            <br/>
                <button
            className="start-btn"
            onClick={()=> this.props.handleStartGame()}
            >Start Game</button>
            </div>
         </div>
      </div>
    )
  }
}
