import React, {Component} from 'react';


export default class FinishPage extends Component {
  render() {
    return (
      <div className="result-page">
        <h1>Total Score: 
          <div className="result-score">
            {this.props.score}
          </div>
        </h1>
      </div>
    )
  }
}
