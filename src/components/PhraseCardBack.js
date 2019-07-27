import React, {Component} from 'react';

class PhraseCardBack extends Component {

  flipToFront = (e) => {
    var card = e.target.parentNode.parentNode;
    if (card.className === "card") {
        card.style.transform = "rotateY(0deg)";
    }
  }

  render(){
    return (
      <div className="phrase-card-back" style={{backgroundImage: `url(${this.props.slang.img_url})`}}>

        <h3 className="text">{this.props.slang.hint}</h3>
        <button className="flip-back" onClick={(e) => this.flipToFront(e)} >Flip back</button>
      </div>
    )
  }
}
export default PhraseCardBack;
