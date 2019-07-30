import React, {Component} from 'react';


export default class StartGame extends Component {
  render() {
    return (
      <div className="start-game">
        <button
        className="start-btn"
        onClick={()=> this.props.handleStartGame()}
         >Start Game</button>
         <div className="guide">
            <br/>
              <h2>Test your knowledge about slang with this Mini Game</h2>
            <br/>
            <div className="rules">
            <h3>Rules:</h3>
            <ul>
              <li>Color cards provide phrases and color cards provide acronym of slnags. Choose the matching pair of cards in 60 seconds. when you find the correct pair of cards you will earn 20 points. If you choose an incorrect pair, 10 points will be deducted.</li>
                <br/>
              <li>🔔: Click to receive a hint. You will get a random penalty.</li>
                <br/>
              <li>↩: Back to display phrases.</li>
            </ul>
            </div>
         </div>
      </div>
    )
  }
}
