import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Order from './components/Order';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/order" element={<Order />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
