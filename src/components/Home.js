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
      <div className="list-of-slangs">
        <h1>Slang List</h1>
         {this.state.slangs.map(slang => <div><li key={slang.id}>{slang.phrase}: {slang.acronym}</li><br/></div>)}
      </div>
    );
  }
};
