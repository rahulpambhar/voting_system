import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeclareState from './pages/DeclaredState'
import State from './pages/State'
import VotingSystem from './pages/VotingSystem'
import HomePage from './pages/HomePage'
import LoginSignup from './pages/LoginSinup'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashoard" element={<DeclareState />} />
          <Route path="/state" element={<State />} />
          <Route path="/votingSystem" element={<VotingSystem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
