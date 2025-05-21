/*import React, { useRef } from "react";*/
import { useNavigate } from "react-router-dom";

function Greet() 
{
const navigate = useNavigate();
  const handleClick = () => {
    navigate("/all_workouts");
};
return(
        <div>
      <h1>Build Your Workout</h1>
        <button onClick={() => navigate('/all_workouts')}>all workouts</button>
        <button onClick={() => navigate('/create_workout')}>create workout</button>
    </div>
)
}



export default Greet

