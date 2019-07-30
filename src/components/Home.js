import React, {Component} from 'react';


const CARDS_API = 'https://slang-challenge-backend.herokuapp.com/cards';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      slangs: [],
    }
  }

  componentDidMount = () => {
    fetch(CARDS_API)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs:  slangs.sort((a, b) => (a.phrase > b.phrase) ? 1 : -1)
    }))
  }

  handleDelete = (e) => {
    e.preventDefault();
    fetch(`${CARDS_API}/${e.target.parentNode.id}`, {
      method: 'DELETE'
    })
    e.target.parentNode.parentNode.remove();
  }
  
  render () {
    return (
      <div className="list-of-slangs">
        <h1>Slang List</h1>
         {this.state.slangs.map(slang => 
           <div>
              {this.props.user.id === slang.user_id ? 
             <div>
                <li key={slang.id} id={slang.id} style={{color: '#006400', 'font-weight': 'bold'}}>{slang.phrase}: {slang.acronym}
                    {this.props.user.id === slang.user_id ? <button className="del-btn" onClick={(e) => this.handleDelete(e)}>✖</button> : null}
                </li>
               <br /> 
             </div>
             :
             <div>
                <li key={slang.id} id={slang.id}>{slang.phrase}: {slang.acronym}
                  {this.props.user.id === slang.user_id ? <button className="del-btn" onClick={(e) => this.handleDelete(e)}>✖</button> : null}
                </li>
                <br />
              </div>
              }
           </div>
         )}
      </div>
    );
  }
};
