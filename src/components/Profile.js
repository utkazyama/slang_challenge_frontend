import React from 'react';
import { tsPropertySignature } from '@babel/types';


const CARDS = 'https://slang-challenge-backend.herokuapp.com/cards';
const CARDS_DEV = 'http://localhost:3001/cards';

class Profile extends React.Component{
  constructor(props){
    super(props)
    this.state={
      phrase: "",
      acronym: "",
      image: "",
      punishment: ""
    }
  }

  handlePhraseChange = (e) => {
    this.setState({
      phrase: e.target.value
    })
  }

  handleAcronymChange = (e) => {
    this.setState({
      acronym: e.target.value
    })
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.value
    })
  }

  handlePunishmentChange = (e) => {
    this.setState({
      punishment: e.target.value
    })
  }

  handleCreateSlang = (e) => {
    e.preventDefault()
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phrase: this.state.phrase,
        acronym: this.state.acronym,
        hint: "",
        punishment: this.state.punishment,
        image: this.state.image,
        user_id: this.props.user.id
      })
    }
    fetch(CARDS_DEV, reqObj)
    .then(resp => resp.json())
    .then(data => this.props.history.push('/home'))
    alert("Successfuly Created New Slang")
  }




  render(){
    return (
     <div className="profile-container">
       <h1>My Page</h1>
       <h2>Name: {this.props.user.name}</h2>

       <form onSubmit={(e) => this.handleCreateSlang(e)}>
         <h1>Create New Slang</h1>
         <div>
           <label htmlFor="phrase">Slang: </label>
           <input onChange={(e) => this.handlePhraseChange(e)} value={this.state.phrase} type="text" name="phrase" placeholder="Phrase" />
         </div>
         <br />
         <div>
           <label htmlFor="achronym">Definition: </label>
           <input onChange={(e) => this.handleAcronymChange(e)} value={this.state.acronym} type="text" name="acronym" placeholder="Acronym" />
         </div>
         <br />
         <div>
           <label htmlFor="img_url">Hint image: </label>
           <input onChange={(e) => this.handleImageChange(e)} value={this.state.image} type="text" name="image" placeholder="Image URL" />
         </div>
         <br />
         <div>
           <label htmlFor="punishment">Punishment: </label>
            <select onChange={(e) => this.handlePunishmentChange(e)} value={this.state.punishment}>
              <option value="time">Time Deduction</option>
              <option value="decScore">Score Deduction</option>
              <option value="pikachu">Disturbing Image</option>
              <option selected value="null">none</option>
            </select>
         </div>
         <br />
         <input className="create-btn" type="submit" value="Create" />
       </form>

     </div>
   )};
};

export default Profile;
