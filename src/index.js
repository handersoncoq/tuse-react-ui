import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Trade from './components/trade-service/Trade';
import Home from './components/Home';
import SignUp from './components/user-service/SignUp';
import SignIn from './components/auth-service/SignIn';
import DashBoard from './components/dashboard/Dashboard';
import Buying from './components/trade-service/Buying';
import Selling from './components/trade-service/Selling';
import Manage from './components/user-service/Manage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/buying" element={<Buying />} />
            <Route path="/selling" element={<Selling />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
