import React, {Component} from 'react';


export default class FinishPage extends Component {
  render() {
    return (
      <div className="result-page">
          <div>
            <h1 className="total-score">Total Score <div className="result-score">{this.props.score}</div></h1>
            <h1>Total Miss <div className="result-score">{this.props.missCount}</div></h1>
            <h1>Total Hint Received <div className="result-score">{this.props.hintCount}</div></h1>
          </div>
      </div>
    )
  }
}
