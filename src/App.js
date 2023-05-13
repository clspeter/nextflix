import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import StartScreen from './screens/StartScreen';
import ProfileScreen from './screens/ProfileScreen';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const auth = getAuth();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log("user")
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          }))
      } else {
        console.log("no user")
        dispatch(logout())
      }
    })


    return unsubscribe
  }, [dispatch])

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route index element={<StartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route index element={<HomeScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
