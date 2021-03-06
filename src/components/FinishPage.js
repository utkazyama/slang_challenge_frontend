import React, {Component} from 'react';
const USERS_DEV = 'http://localhost:3001/users';

export default class FinishPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      orginal_total_score: this.props.user.total_score,
      original_total_game_played: this.props.user.total_game_played,
      original_accuracy_rate: this.props.user.accuracy_rate
    }
  }

  handlePecentage = () => {
    const correctAnswer = this.props.answered;
    let percentage = ((correctAnswer)/(correctAnswer+this.props.missCount))*100;
    return percentage.toFixed(2);
  }

  handleAccuracy = () => {
    const ar = parseInt(this.handlePecentage());
    const orAcR = this.state.original_accuracy_rate !== null ? parseInt(this.state.original_accuracy_rate) : 0
    const total_ar = orAcR === 0 ? ar : (orAcR + ar)/2;
    return total_ar
  }

  handleScoreUpdate = (e) => {
    const newAr = this.handleAccuracy();
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       total_score: this.props.user.total_score === null ? this.props.score : parseInt(this.props.user.total_score) + this.props.score,
       total_game_played: this.state.original_total_game_played === null ? 1 : parseInt(this.state.original_total_game_played) + 1,
       accuracy_rate: newAr
      })
    }
    fetch(`${USERS_DEV}/${this.props.user.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => data)
    e.target.remove();
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
          <button className="score-btn" onClick={(e) => {this.handleScoreUpdate(e)}}>Submit Score</button>
        </div>

      </div>
    )
  }
}
