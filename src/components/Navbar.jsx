import React, {useEffect} from 'react';



export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src="src\Images\logo.png" alt="Podcast Logo" className="logo" />
      </div>
      <div className="login-container">
        <img src="src\Images\login.png" alt="Login" className="login-icon" />
      </div>
    </div>
  );
};

//export default Navbar;
