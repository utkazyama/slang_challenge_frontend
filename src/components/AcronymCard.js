import React, {Component} from 'react';

class AcronymCard extends Component {



  render(){
    return (
      <div id= {this.props.slang.id} className="card" onClick={(e) => this.props.handleColor(e)} >
        <div className="acronym-card">
          <h3 className="acr-text">{this.props.slang.acronym}</h3>
        </div>
      </div>
    )
  }
}
export default AcronymCard;
