import React, { useRef , useEffect, useState} from "react";
import { Link } from 'react-router-dom';

function All_workouts() {
    const [workouts, setWorkouts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/workouts')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setWorkouts(data);
        })
        .catch(error => {
            console.error('Error fetching workouts:', error);
        });
    }, []);
  return (
<div>
      <h1>All Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout.workout_id} style={{ marginBottom: "20px" }}>
          <h2><Link to="/workout_details" style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> {workout.name}</Link></h2>
          <ul>
            {workout.workout_exersice?.map((item) => (
              <li key={item.id}>
                Exersice: {item.exersice.name} | reps: {item.reps} | placement: {item.placement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}



export default All_workouts;