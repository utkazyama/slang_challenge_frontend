import React, {Component} from 'react';

class PhraseCardFront extends Component {

  render(){
    return (
      <div className="phrase-card-front">
        <h3 className="text">{this.props.slang.phrase}</h3>
        <span />
        <button className="hint">hint</button>
      </div>
    )
  }
}
export default PhraseCardFront;
