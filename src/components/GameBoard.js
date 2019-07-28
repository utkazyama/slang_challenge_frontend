import React, {Component} from 'react';
import AcronymCard from './AcronymCard.js'
import FinishPage from './FinishPage.js'
import Card from './Card.js';
import StartGame from './StartGame.js';

const API = 'https://slang-challenge-backend.herokuapp.com/cards';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      slangs: [],
      selected: [],
      score: 0,
      timer: 30,
      initial: [],
      gameStarted: false
    }
  }

  countTimer = () => {
    let remainTime = setInterval(() => {
      if (this.state.timer > 0){
      this.setState({
        timer: this.state.timer - 1
      })
    } else {
        clearInterval(remainTime)
      }
    }, 1000)
  }

  componentDidMount = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs: slangs
    }))
  }

  filterCorrect = (selectedId) => {
    let remain = this.state.slangs
    return  remain.filter(slang => slang.id != selectedId)
  }

  handleSelect = (e) => {
    let selectedId = e.target.parentNode.id
    let filtered = this.filterCorrect(selectedId);
    if (this.state.selected.length === 0){
      let initial = e.target.parentNode
      this.setState({
        selected: selectedId,
        initial: initial
      })
    }else if (this.state.selected === selectedId){
      let currentScore = this.state.score
      this.setState({
        selected: [],
        score: currentScore + 10,
        slangs: filtered
      })
    }else if(this.state.selected !== selectedId){
      let currentScore = this.state.score
      this.setState({
        score: currentScore - 10
      })
      this.changeToRed(e);
    }
  }

  toNormal = (card, choosenCard) => {
    choosenCard.style.border = "none";
    card.style.border = "none";
  }

  changeToRed = (e) => {
    var card = e.target.parentNode;
    const choosenCard = this.state.initial

    choosenCard.style.border = "4px solid red";
    choosenCard.style.borderRadius = "5px";
    card.style.border = "4px solid red";
    card.style.borderRadius = "5px";

    this.setState({
      selected:[]
    })

    setTimeout(()=>{
      this.toNormal(card, choosenCard)
    }, 1000);
  }

  handleUnSelect = () => {
    this.setState({
      selected: []
    })
  }

  handleColor = (e) => {
    var card = e.target.parentNode;
    if (card.className === "card"){
      if (card.style.border === "4px solid green"){
        card.style.border = "none";
        this.handleUnSelect();
      } else {
      card.style.border = "4px solid green";
      card.style.borderRadius = "5px";
      this.handleSelect(e)
      }
    }
  }

  renderCards = () => {
    return this.state.slangs.slice(0, 6).map(slang => {
      return < Card
      handleSelect={this.handleSelect}
      handleUnSelect={this.handleUnSelect}
      handleColor={this.handleColor}
      slang={slang} key={slang.id}
      />
    })
  }

  renderAcronym = () => {
    return this.state.slangs.slice(0, 6).map(slang => {
      return < AcronymCard
      handleSelect={this.handleSelect}
      handleUnSelect={this.handleUnSelect}
      handleColor={this.handleColor}
      slang={slang} key={slang.id} />
    })
  }

  handleStartGame = () => {
    this.setState({
      gameStarted: true
    })
    this.countTimer()
  }

  render(){
    return (
      <div>
        {this.state.gameStarted === false ?
          < StartGame handleStartGame={this.handleStartGame} />
        :
          <div>
         {this.state.timer === 0 ?
           < FinishPage score={this.state.score}/>
           :
           <div>
            <div>
              Timer: {this.state.timer}
              <br />
              Score: {this.state.score}
            </div>

            <div id="slang-showcase">
              {this.renderCards()}
              {this.renderAcronym()}
            </div>
          </div>

        }
        </div>
      }
      </div>
    )
  }
}
export default GameBoard;
