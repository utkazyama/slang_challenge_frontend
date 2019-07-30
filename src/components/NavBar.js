import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
 return (
   <div className='navbar'>
    <nav>
     <ul>
       <li><NavLink to='/'>Login</NavLink></li>
       <li><NavLink to='/home'>Home</NavLink></li>
       <li><NavLink to='/profile'>Profile</NavLink></li>
       <li><NavLink to='/gameboard'>Mini Game</NavLink></li>
     </ul>
     </nav>
   </div>
 );
};
export default NavBar;
