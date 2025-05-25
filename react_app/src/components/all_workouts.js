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
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>All Workouts</h1>
      {workouts.map((workout) => (
          <div key={workout.workout_id} style={{ display: 'flex', justifyContent: 'center' }}>
            <h2><Link to={`/workouts/${workout.workout_id}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> {workout.name}</Link></h2>
          </div>
      ))}
    </div>
  );
}



export default All_workouts;