import React, {Component} from 'react';

class AcronymCard extends Component {

  handleColor = (e) => {
    var card = e.target.parentNode;
    if (card.className === "card"){
      if (card.style.border === "4px solid green"){
        card.style.border = "none";
      } else {
      card.style.border = "4px solid green";
      card.style.borderRadius = "5px";
      this.props.handleSelect(e)
      }
    } else if(card.parentNode.className === "card") {
      if (card.parentNode.style.border === "4px solid green"){
        card.parentNode.style.border = "none";
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
        <div className="phrase-card-front">
          <h3 className="acr-text">{this.props.slang.acronym}</h3>
        </div>
      </div>
    )
  }
}
export default AcronymCard;
