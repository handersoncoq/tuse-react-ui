import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Trade from './components/trade-service/Trade';
import Home from './components/Home';
import SignUp from './components/user-service/SignUp';
import SignIn from './components/auth-service/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/trade" element={<Trade />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
