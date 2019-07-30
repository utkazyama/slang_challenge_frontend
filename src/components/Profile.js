import React from 'react';
import { tsPropertySignature } from '@babel/types';

const Profile = (props) => {
 return (
   <div className="profile-container">
     <h1>My Page</h1>
     <h2>Name: {props.user.name}</h2>
   </div>
 );
};

export default Profile;
