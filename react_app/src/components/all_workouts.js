import React, { useRef , useEffect, useState} from "react";

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
      <h1>All workouts</h1>
      <p>{workouts.map((workout, index) => (
        <li key={index}>{workout.name}</li>
      ))}</p>
    </div>
  );
}



export default All_workouts;