import React, {Component} from 'react';

class PhraseCardFront extends Component {

  flipToBack = (e, punishmentType) => {
    var card = e.target.parentNode.parentNode;
    	if (card.className === "card") {
        card.style.transform = "rotateY(180deg)";
        this.passPunishmentType(punishmentType)
      }

  }

  passPunishmentType = (punishmentType) => {
    this.props.handlePunishment(this.props.slang.punishment)
  }

  render(){
    return (
      <div className="phrase-card-front">
         <h3 className="text">{this.props.slang.phrase}</h3>
         <button className="hint" onClick={(e, punishmentType) => this.flipToBack(e, this.props.slang.punishment)} >🔔</button>
       </div>
    )
  }
}
export default PhraseCardFront;
