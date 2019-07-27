import React, {Component} from 'react';
import AcronymCard from './AcronymCard.js'
import Card from './Card.js';

const API = 'https://slang-challenge-backend.herokuapp.com/cards';


class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      slangs: [],
      selected: [],
      score: 0
    }
  }

  componentDidMount = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs: slangs
    }))
  }


  handleSelect = (e) => {
    let selectedId = e.target.parentNode.id
    if (this.state.selected.length === 0){
      this.setState({
        selected: selectedId
      })
    }else if (this.state.selected === selectedId){
      let currentScore = this.state.score
      this.setState({
        selected: [],
        score: currentScore + 10
      })
    }
  }

  renderCards = () => {

    return this.state.slangs.slice(1, 7).map(slang => {
      return < Card handleSelect = {this.handleSelect} slang={slang} key={slang.id} />
    })
  }

  renderAcronym = () => {
    return this.state.slangs.slice(1, 7).map(slang => {
      return < AcronymCard handleSelect = {this.handleSelect} slang={slang} key={slang.id} />
    })
  }


  render(){
    return (
      <div>
       Score: {this.state.score}
        <div id="slang-showcase">
          {this.renderCards()}
          {this.renderAcronym()}
        </div>
      </div>
    )
  }
}
export default GameBoard;
