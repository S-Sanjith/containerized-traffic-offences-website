import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Landing from './screens/landing/landing';
import FooterComp from './components/footer/footer';
import ViewAll from './screens/view all/view';
import AddScr from './screens/addEntry/add';
import SignupPage from './signup';
import LoginPage from './login';
import {loadUser} from './action/user'

import {  useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch= useDispatch()
  
  const {isAuthenticated}= useSelector(state=> state.user)
   useEffect(()=>{
     dispatch(loadUser())
   },[dispatch])
  
  return (   
    <BrowserRouter>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/add" element={<AddScr />} />
            <Route path="/all" element={<ViewAll />} />
          </Routes>
          <FooterComp />
        </>
      )}
    </BrowserRouter>
   
  );
}



export default App;
