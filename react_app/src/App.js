
/*import React , { useRef } from "react";*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Greet from './components/greet.js';
import All_workouts from './components/all_workouts';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Greet />} />
      <Route path="/All_workouts" element={<All_workouts />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
