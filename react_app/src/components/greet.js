/*import React, { useRef } from "react";*/
import { useNavigate } from "react-router-dom";

function Greet() 
{
const navigate = useNavigate();
return(
        <div>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Build Your Workout</h1>
      <h2  style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => navigate('/all_workouts')} >all workouts</button>
        <button onClick={() => navigate('/create_workout')}>create workout</button>
      </h2>
    </div>
)
}

export default Greet

