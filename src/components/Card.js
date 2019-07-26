import React, {Component} from 'react';
import PhraseCardFront from './PhraseCardFront.js';
import PhraseCardBack from './PhraseCardBack.js';

class Card extends Component {

  render(){
    return (
      <div className="card">
        < PhraseCardFront slang={this.props.slang} />
        < PhraseCardBack slang={this.props.slang} />
      </div>
    )
  }
}
export default Card;
