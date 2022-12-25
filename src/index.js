import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trade from "./components/trade-service/Trade";
import Home from "./components/Home";
import SignUp from "./components/user-service/SignUp";
import SignIn from "./components/auth-service/SignIn";
import DashBoard from "./components/dashboard/Dashboard";
import Buying from "./components/trade-service/Buying";
import Selling from "./components/trade-service/Selling";
import Manage from "./components/user-service/Manage";
import Inbox from "./inbox/Inbox";
import { paths } from "./endpoints/Endpoints";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={paths.signUp} element={<SignUp />} />
        <Route path={paths.signIn} element={<SignIn />} />
        <Route path={paths.buying} element={<Buying />} />
        <Route path={paths.selling} element={<Selling />} />
        <Route path={paths.trading} element={<Trade />} />
        <Route path={paths.managing} element={<Manage />} />
        <Route path={paths.dashboard} element={<DashBoard />} />
        <Route path={paths.inbox} element={<Inbox />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
