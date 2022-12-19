import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Trade from './components/trade-service/Trade';
import Home from './components/Home';
import SignUp from './components/user-service/SignUp';
import SignIn from './components/auth-service/SignIn';
import Account from './components/user-service/Account';
import DashBoard from './components/dashboard/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
