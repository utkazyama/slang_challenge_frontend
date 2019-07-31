import React, {Component} from 'react';
import AcronymCard from './AcronymCard.js'
import FinishPage from './FinishPage.js'
import Card from './Card.js';
import StartGame from './StartGame.js';
{/* <img src='https://i.imgur.com/VajXFPa.gif' /> pikachu */}


const API = 'https://slang-challenge-backend.herokuapp.com/cards';
const API_DEV = 'http://localhost:3001/cards';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialN: 0,
      slangs: [],
      selected: [],
      score: 0,
      timer: 40,
      prevTimer: 40,
      initial: [],
      gameStarted: false,
      shuffledPh: false,
      shuffledAc: false,
      phArr: [],
      acArr: [],
      correctCards: [],
      answered: 0,
      disabled: false
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
    fetch(API_DEV)
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
    let targetEl = this.handleValid(e);
    let selectedId = this.handleValid(e).id
    if (this.state.selected.length === 0){
      let initial = this.handleValid(e)
      this.setState({
        selected: selectedId,
        initial: initial
      })
    }else if (this.state.selected === selectedId){
      let currentScore = this.state.score
      this.setState({
        selected: [],
        score: currentScore + 20,
        correctCards: this.state.correctCards.concat(selectedId),
        answered: this.state.answered + 1
      })
      this.changeOpacity(targetEl);
    }else if(this.state.selected !== selectedId){
      let currentScore = this.state.score
      this.setState({
        score: currentScore - 20,
        disabled: true
      })
      this.changeToRed(targetEl);
    }
  }

  toNormal = (card, choosenCard) => {
    choosenCard.style.border = "none";
    card.style.border = "none";
    this.setState({
      selected:[],
      disabled: false
    })
  }

  changeOpacity = (targetEl) => {
    var card = targetEl;
    const choosenCard = this.state.initial;
    card.style.filter = "opacity(0.05)";
    choosenCard.style.filter = "opacity(0.05)";
  }

  changeToRed = (targetEl) => {
    var card = targetEl;
    const choosenCard = this.state.initial

    choosenCard.style.border = "4px solid red";
    choosenCard.style.borderRadius = "7%";
    card.style.border = "4px solid red";
    card.style.borderRadius = "7%";

    setTimeout(()=>{
      this.toNormal(card, choosenCard)
    }, 1200);
  }

  handleUnSelect = () => {
    this.setState({
      selected: [],
      initial: []
    })
  }

  handleValid = (e) => {
    if(e.target.parentNode.className === "card"){
      return e.target.parentNode;
    } else if(e.target.parentNode.parentNode.className === "card"){
      return e.target.parentNode.parentNode;
    }
  }

  handleColor = (e) => {
  let selectedId = this.handleValid(e).id
  if (this.state.correctCards.includes(selectedId)){
    return
    }else{
    var card = this.handleValid(e);
    if (card.className === "card" && this.state.disabled === false){
      if (card.style.border === "4px solid green"){
        card.style.border = "none";
        this.handleUnSelect();
      } else if(e.target.className !== "hint" && e.target.className !== "flip-back") {
      card.style.border = "4px solid green";
      card.style.borderRadius = "7%";
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
    }else if(punishmentType === "pikachu"){
      this.handlePikachu()
    }
  }

  handleTimePunishment = () => {
    this.setState({
      timer: this.state.timer -5
    })
  }

  handleDecScore = () => {
    this.setState({
      score: this.state.score - 15
    })
  }

  handlePikachu = () => {
    const background = document.querySelector('.App');
    background.style.backgroundImage = "url('https://i.imgur.com/VajXFPa.gif')";
  }

  handleTimerColor = () => {
  if (this.state.prevTimer-this.state.timer > 2){
    return "red"
  } else if(this.state.timer-this.state.prevTimer > 1){
    return "green"
  } else {
    return "white"
  }
}

handleBackground = () => {
  const background = document.querySelector('.App');
  background.style.backgroundImage = "url('https://wallpapercave.com/wp/wp1979062.jpg')";
}

  render(){
    return (
      <div>
        {this.state.gameStarted === false ?
          < StartGame handleStartGame={this.handleStartGame} />
        :
          <div>
         {this.state.timer <= 0 || this.state.answered === 8 ?
           < FinishPage score={this.state.score} handleBackground={this.handleBackground()}/>
           :
           <div className="timer-container">
              <div className="timer-group">
                <div className="timer minute">
                  <div className="hand"><span></span></div>
                  <div className="hand"><span></span></div>
                </div>
                <div className="timer second">
                  <div className="hand"></div>
                  <div className="hand"></div>
                </div>
                <div className="face">
                  <h2>Score: {this.state.score}</h2>
                  <p id="lazy" style={{color: `${this.handleTimerColor()}`}}>{this.state.timer}</p>
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
