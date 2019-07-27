import React, {Component} from 'react';
import AcronymCard from './AcronymCard.js'
import Card from './Card.js';

const API = 'https://slang-challenge-backend.herokuapp.com/cards';


class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      slangs: []
    }
  }

  componentDidMount = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs: slangs
    }))
  }

  renderCards = () => {
    return this.state.slangs.slice(1, 7).map(slang => {
      return < Card slang={slang} key={slang.id} />
    })
  }

  renderAcronym = () => {
    return this.state.slangs.slice(1, 7).map(slang => {
      return < AcronymCard slang={slang} key={slang.id} />
    })
  }


  render(){
    return (
      <div>
        <div id="slang-showcase">
          {this.renderCards()}
          {this.renderAcronym()}
        </div>
      </div>
    )
  }
}
export default GameBoard;
