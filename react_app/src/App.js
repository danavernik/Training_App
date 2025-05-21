/*import React , { useRef } from "react";*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Greet from './components/greet.js';
import All_workouts from './components/all_workouts';
import Create_workout from "./components/create_workout.js";
import Workout_details from "./components/workout_details.js";
import Perform_exersice from "./components/perform_exersice.js";


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Greet />} />
      <Route path="/All_workouts" element={<All_workouts />} />
      <Route path="/create_workout" element={<Create_workout />} />
      <Route path="/workout_details" element={<Workout_details />} />
      <Route path="/perform_exersice" element={<Perform_exersice />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
