import React, {Component} from 'react';
import PhraseCardFront from './PhraseCardFront.js';
import PhraseCardBack from './PhraseCardBack.js';

class Card extends Component {

  render(){
    return (
      <div id= {this.props.slang.id} className="card" onClick={(e) => this.props.handleColor(e)} >
        < PhraseCardFront slang={this.props.slang} handlePunishment={(punishmentType)=>this.props.handlePunishment(punishmentType)} />
        < PhraseCardBack slang={this.props.slang} />
      </div>

    )
  }
}
export default Card;
