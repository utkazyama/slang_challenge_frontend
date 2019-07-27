import React, {Component} from 'react';
import PhraseCardFront from './PhraseCardFront.js';
import PhraseCardBack from './PhraseCardBack.js';

class Card extends Component {

  handleColor = (e) => {
    var card = e.target.parentNode;
    if (card.className === "card"){
      if (card.style.border === "4px solid green"){
        card.style.border = "none";
        this.props.handleUnSelect();
      } else {
      card.style.border = "4px solid green";
      card.style.borderRadius = "5px";
      this.props.handleSelect(e)
      }
    } else if(card.parentNode.className === "card" && e.target.className !== "hint" && e.target.className !== "flip-back") {
      if (card.parentNode.style.border === "4px solid green"){
        card.parentNode.style.border = "none";
        this.props.handleUnSelect();
      } else {
      card.parentNode.style.border = "4px solid green";
      card.parentNode.style.borderRadius = "5px";
      this.props.handleSelect(e)
      }
    }
  }

  render(){
    return (
      <div id= {this.props.slang.id} className="card" onClick={(e) => this.handleColor(e)} >
        < PhraseCardFront slang={this.props.slang} />
        < PhraseCardBack slang={this.props.slang} />
      </div>

    )
  }
}
export default Card;
