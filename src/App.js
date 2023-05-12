import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';

function App() {

  const user = null;

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route exact path="/" element={<StartScreen />} />
            <Route exact path="/login" element={<LoginScreen />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
