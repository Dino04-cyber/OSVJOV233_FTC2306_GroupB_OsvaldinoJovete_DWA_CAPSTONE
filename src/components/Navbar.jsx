import React from 'react';
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src="https://i.postimg.cc/pXJWT0jD/logo.png" alt="Podcast Logo" className="logo" />
      </div>
      <div>
        <button className='button'>Favourites</button>
      </div>
    </div>
  );
};
