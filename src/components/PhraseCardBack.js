import React, {Component} from 'react';

class PhraseCardBack extends Component {

  render(){
    return (
      <div className="phrase-card-back" style={{backgroundImage: `url(${this.props.slang.img_url})`}}>
        <h3 className="text">{this.props.slang.hint}</h3>
        <button>Flip back</button>
      </div>
    )
  }
}
export default PhraseCardBack;
