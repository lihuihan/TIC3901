// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

import './App.css';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profiles/*" element={<ProfilePage />} />
          </Routes>
      </Router>
  );
};

export default App;
