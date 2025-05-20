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
      <button onClick={handleClick}>all workouts</button>
    </div>
)
}



export default Greet

