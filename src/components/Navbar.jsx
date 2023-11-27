import React, {useEffect} from 'react';
import LoginPage from './LoginPage'


export default function Navbar() {

  // const user = session.user
  // console.log(user)
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src="src\Images\logo.png" alt="Podcast Logo" className="logo" />
      </div>
      <div>
      <span>Welcome</span>
      </div>
      <div className="login-container">
        <img src="src\Images\login.png" alt="Login" className="login-icon" />
      </div>
    </div>
  );
};

//export default Navbar;
