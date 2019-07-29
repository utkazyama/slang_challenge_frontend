import React, {Component} from 'react';


const API = 'https://slang-challenge-backend.herokuapp.com/cards';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      slangs: [],
    }
  }
  componentDidMount = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs:  slangs.sort((a, b) => (a.phrase > b.phrase) ? 1 : -1)
    }))
  }
  
  render () {
    return (
      <div>
        <h1>Slang List</h1>

         {this.state.slangs.map(slang => <li>{slang.phrase}: {slang.acronym}</li>)}

      </div>
    );
  }
};
