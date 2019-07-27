import React, {Component} from 'react';

class AcronymCard extends Component {

  handleSelect = (e) => {
    var card = e.target.parentNode;
    if (card.className === "card"){
      if (card.style.border === "4px solid green"){
        card.style.border = "none";
      } else {
      card.style.border = "4px solid green";
      card.style.borderRadius = "5px";
      }
    } else if(card.parentNode.className === "card") {
      if (card.parentNode.style.border === "4px solid green"){
        card.parentNode.style.border = "none";
      } else {
      card.parentNode.style.border = "4px solid green";
      card.parentNode.style.borderRadius = "5px";
      }
    }
  }

  render(){
    return (
      <div className="card" onClick={(e) => this.handleSelect(e)} >
        <div className="phrase-card-front">
          <h3 className="acr-text">{this.props.slang.acronym}</h3>
        </div>
      </div>
    )
  }
}
export default AcronymCard;
