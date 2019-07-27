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
      score: 0,
      boardedCards: 6
    }
  }

  componentDidMount = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs: slangs
    }))
  }

  filterCorrect = (selectedId) => {
    return this.state.slangs.filter(slang => slang.id !== selectedId);
  }

  handleSelect = (e) => {
    let selectedId = e.target.parentNode.id
    let filtered = this.filterCorrect(selectedId);
    if (this.state.selected.length === 0){
      this.setState({
        selected: selectedId
      })
    }else if (this.state.selected === selectedId){
      let currentScore = this.state.score
      let maximumCard = this.state.boardedCards;
      this.setState({
        selected: [],
        score: currentScore + 10,
        slangs: filtered,
        boardedCards: maximumCard - 1
      })
    }else if(this.state.selected !== selectedId){
      let currentScore = this.state.score
      this.setState({
        score: currentScore - 20
      })
    }
  }

  handleUnSelect = () => {
    this.setState({
      selected: []
    })
  }

  renderCards = () => {
    let maximumCard = this.state.boardedCards;
    return this.state.slangs.slice(0, maximumCard).map(slang => {
      return < Card
      handleSelect={this.handleSelect}
      handleUnSelect={this.handleUnSelect}
      slang={slang} key={slang.id}
      />
    })
  }

  renderAcronym = () => {
    let maximumCard = this.state.boardedCards;
    return this.state.slangs.slice(0, maximumCard).map(slang => {
      return < AcronymCard
      handleSelect={this.handleSelect}
      handleUnSelect={this.handleUnSelect}
      slang={slang} key={slang.id} />
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
