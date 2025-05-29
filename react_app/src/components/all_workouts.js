import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function All_workouts() {
    const [workouts, setWorkouts] = useState([]);
    const [name, setName] = useState("");
    const [results, setResults] = useState([]);
    const handleSearch = async () => {
    try {
      const params = {};
      if (name) params.name = name;
      const response = await axios.get("http://localhost:8000/search_workouts", { params });
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h2>Search workout</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((workout) => (
            <li key={workout.id}>
              <Link to={`/workouts/${workout.workout_id}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                {workout.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
      {workouts.map((workout) => (
          <div key={workout.workout_id} style={{ display: 'flex', justifyContent: 'center' }}>
            <h2><Link to={`/workouts/${workout.workout_id}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> {workout.name}</Link></h2>
          </div>
      ))}
    </div>
  );
}



export default All_workouts;