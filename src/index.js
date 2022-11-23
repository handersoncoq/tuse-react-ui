import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TuseContainer from './components/TuseContainer';
import Order from './components/Order';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<TuseContainer />} />
            <Route path="/order" element={<Order />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
