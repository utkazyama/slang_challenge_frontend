import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  const displays = props.user.name ? {display: 'block'} : {display: 'none'}
 return (
   <div className='navbar' style={displays}>
    <nav>
     <ul>
       <li onClick={() => {props.handleLogout()}} >
        <NavLink to='/'>Logout</NavLink></li>
       <li><NavLink to='/home'>All Slangs</NavLink></li>
       <li><NavLink to='/profile'>My Page</NavLink></li>
       <li><NavLink to='/gameboard'>Mini Game</NavLink></li>
     </ul>
     </nav>
   </div>
 );
};
export default NavBar;
