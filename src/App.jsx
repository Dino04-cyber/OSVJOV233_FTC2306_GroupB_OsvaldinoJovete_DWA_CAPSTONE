import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PodcastList from './components/PodcastList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div>
      <Router>
        {
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        }
      </Router>
      <Navbar />
      <PodcastList />
    </div>
  );
}

export default App;
