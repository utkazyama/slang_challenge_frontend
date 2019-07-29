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
      initialN: 0,
      slangs: [],
      selected: [],
      score: 0,
      timer: 60,
      prevTimer: 60,
      initial: [],
      gameStarted: false,
      shuffledPh: false,
      shuffledAc: false,
      phArr: [],
      acArr: [],
      correctCards: []
    }
  }

  countTimer = () => {
    let remainTime = setInterval(() => {
      if (this.state.timer > 0){
      this.setState({
        timer: this.state.timer - 1,
        prevTimer: this.state.timer
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

  filterCorrectPh = (selectedId) => {
    let remain = this.state.phArr
    return  remain.filter(slang => slang.id == selectedId)
  }

  filterCorrectAc = (selectedId) => {
    let remain = this.state.acArr
    return  remain.filter(slang => slang.id == selectedId)
  }

  handleSelect = (e) => {
    let selectedId = e.target.parentNode.id
    let filteredPh = this.filterCorrectPh(selectedId);
    let filteredAc = this.filterCorrectAc(selectedId);
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
        score: currentScore + 20,
        correctCards: this.state.correctCards.concat(selectedId)
      })
      this.changeOpacity(e);
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

  changeOpacity = (e) => {
    var card = e.target.parentNode;
    const choosenCard = this.state.initial
    card.style.filter = "opacity(0.05)";
    choosenCard.style.filter = "opacity(0.05)";
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
  let selectedId = e.target.parentNode.id
  if (this.state.correctCards.includes(selectedId)){
    return
    }else{
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
  }

  renderCards = () => {
    if (this.state.shuffledPh === false){
    const initialN = this.state.initialN
    const phr = this.state.slangs.slice(initialN, initialN+8)
    for (let i = phr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
      [phr[i], phr[j]] = [phr[j], phr[i]];
    }
     this.setState({
       shuffledPh: true,
       phArr: this.state.phArr.concat(phr)
     })
    }

    return this.state.phArr.map(slang => {
      return < Card
      handleSelect={this.handleSelect}
      handleUnSelect={this.handleUnSelect}
      handleColor={this.handleColor}
      handlePunishment={(punishmentType) => this.handlePunishment(punishmentType)}
      slang={slang} key={slang.id}
      />
    })
  }

  renderAcronym = () => {
    if (!this.state.shuffledAc){
    const initialN = this.state.initialN
    const acr = this.state.slangs.slice(initialN, initialN+8)
    for (let i = acr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
      [acr[i], acr[j]] = [acr[j], acr[i]];
    }
     this.setState({
       shuffledAc: true,
       acArr: this.state.acArr.concat(acr)
     })
    }

    return this.state.acArr.map(slang => {
      return < AcronymCard
      handleSelect={this.handleSelect}
      handleUnSelect={this.handleUnSelect}
      handleColor={this.handleColor}
      slang={slang} key={slang.id} />
    })
  }

  handleStartGame = () => {
    const randomInitialN = Math.floor(Math.random() * Math.floor(this.state.slangs.length-8))
    this.setState({
      gameStarted: true,
      initialN: randomInitialN
    })
    this.countTimer()
  }

  handlePunishment = (punishmentType) => {
    if (punishmentType === "time"){
      this.handleTimePunishment()
    }else if(punishmentType === "decScore"){
      this.handleDecScore()
    }else if(punishmentType === "changeColor"){
      this.handleChangeColor()
    }
  }

  handleTimePunishment = () => {
    this.setState({
      timer: this.state.timer -3
    })
  }

  handleDecScore = () => {
    this.setState({
      score: this.state.score -0.02193012930
    })
  }

  handleChangeColor = () => {
    console.log("Consider this part")
  }

  handleTimerColor = () => {
  if (this.state.prevTimer-this.state.timer > 2){
    return "red"
  } else if(this.state.timer-this.state.prevTimer > 1){
    return "green"
  } else {
    return "black"
  }
}

  render(){
    return (
      <div>
        {this.state.gameStarted === false ?
          < StartGame handleStartGame={this.handleStartGame} />
        :
          <div>
         {this.state.timer <= 0 ?
           < FinishPage score={this.state.score}/>
           :
           <div>
            <div>
             <div className="timer" style={{color: `${this.handleTimerColor()}`}}>
               Timer: {this.state.timer}
             </div>
               <br />
             <div className="score">
             Score: {this.state.score}
             </div>
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
