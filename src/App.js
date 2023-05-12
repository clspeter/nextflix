import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const user = null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log("user logged in")
        console.log(userAuth);
      } else {
        console.log("no user")
      }
    })

    return unsubscribe
  }, [])

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
