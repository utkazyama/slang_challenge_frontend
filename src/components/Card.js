import React, {Component} from 'react';
import PhraseCardFront from './PhraseCardFront.js';
import PhraseCardBack from './PhraseCardBack.js';

class Card extends Component {

  handleSelect = (e) => {
    var card = e.target.parentNode;
    if (card.className === "card"){
      if (card.style.border === "4px solid green"){
        card.style.border = "none";
      } else {
      card.style.border = "4px solid green";
      card.style.borderRadius = "5px";
      }
    }
  }

  render(){
    return (
      <div className="card" onClick={(e) => this.handleSelect(e)} >
        < PhraseCardFront slang={this.props.slang} />
        < PhraseCardBack slang={this.props.slang} />
      </div>

    )
  }
}
export default Card;
