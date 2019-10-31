import React, {Component} from 'react';

const CARDS_API = 'https://slang-challenge-backend.herokuapp.com/cards';
const CARDS_API_DEV = 'http://localhost:3001/cards';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      slangs: [],
    }
  }

  componentDidMount = () => {
    fetch(CARDS_API_DEV)
    .then(resp => resp.json())
    .then(slangs => this.setState({
      slangs: slangs.sort((a, b) => (a.phrase > b.phrase) ? 1 : -1)
    }))
  }

  handleDelete = (e) => {
    e.preventDefault();
    fetch(`${CARDS_API_DEV}/${e.target.parentNode.parentNode.id}`, {
      method: 'DELETE'
    })
    e.target.parentNode.parentNode.parentNode.remove();
  }

  handleEdit = (e, id) => {
    this.props.history.push('/edit' + '?slang=' + id)
  }

  render () {
    return (
      <div className="list-of-slangs">
        <h1 className="slang-list-title">All Slangs</h1>
         {this.state.slangs.map(slang =>
           <div className="slang-list-container" key={slang.id}>
              {this.props.user.id === slang.user_id ?
             <div className="slang-element">
                <li key={slang.id} id={slang.id} style={{color: 'red', 'fontWeight': 'bold'}}>{slang.phrase}: {slang.acronym}
                    {this.props.user.id === slang.user_id ?
                    <div className="btn-container">
                    <button className="edit-btn" onClick={(e) => this.handleEdit(e, slang.id)}>✏</button>
                    <button className="del-btn" onClick={(e) => this.handleDelete(e)}>✖</button>
                    </div>
                    :
                    null}
                </li>
               <br />
             </div>
             :
             <div className="slang-element">
                <li key={slang.id} id={slang.id}>{slang.phrase}: {slang.acronym}
                  {this.props.user.id === slang.user_id ?
                  <div className="btn-container">
                  <button className="edit-btn" onClick={(e) => this.handleEdit(e)}>✏</button>
                  <button className="del-btn" onClick={(e) => this.handleDelete(e)}>✖</button>
                  </div>
                  :
                  null}
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
