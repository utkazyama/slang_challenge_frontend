import React, {Component} from 'react';

class PhraseCardFront extends Component {

  flipToBack = (e) => {
    var card = e.target.parentNode.parentNode;
    	if (card.className === "card") {
          card.style.transform = "rotateY(180deg)";
      }
  }

  render(){
    return (
      <div className="phrase-card-front">
       <h1>{this.props.slang.id}</h1>
        <h3 className="text">{this.props.slang.phrase}</h3>
        <button className="hint" onClick={(e) => this.flipToBack(e)} >hint</button>
      </div>
    )
  }
}
export default PhraseCardFront;
