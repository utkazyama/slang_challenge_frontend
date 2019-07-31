import React, {Component} from 'react';


export default class FinishPage extends Component {

  handlePecentage = () => {
    const correctAnswer = this.props.answered;
    let percentage = ((correctAnswer - this.props.missCount)/correctAnswer)*100;
    if (percentage <= 0){
      return 0;
    } else {
      let percentage = ((correctAnswer - this.props.missCount)/correctAnswer)*100;
      return percentage;
    }
  }

  render() {
    return (
      <div className="result-page">

        <div className="score-container">
          <h1 className="total-score">Total Score <div className="result-score">{this.props.score}</div></h1>
        </div>

        <div className="sub-container">
          <div className="miss-container">
            <h1>Miss <div className="miss-count">{this.props.missCount}</div></h1>
          </div>

          <div className="hint-container">
            <h1>Hint <div className="hint-count">{this.props.hintCount}</div></h1>
          </div>

          <div className="AR-container">
            <h1>Accuracy <div className="rate">{this.handlePecentage()}%</div></h1>
          </div>
        </div>

      </div>
    )
  }
}
