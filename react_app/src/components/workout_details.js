import React, { useRef , useEffect, useState} from "react";

function Workout_details() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/workouts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then((data) => {
        setWorkouts(data);
      })
      .catch((err) => {
        console.error('Failed to fetch workouts:', err);
        setError('Something went wrong');
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Workout Details</h1>
      {workouts.map((workout) => (
        <div key={workout.workout_id} style={{ marginBottom: '30px' }}>
          <h2>{workout.name}</h2>
          <ul>
            {workout.workout_exersice?.map((item) => (
              <li key={item.id}>
                <strong>Exercise:</strong> {item.exersice.name} | <strong>Reps:</strong> {item.reps} | <strong>Placement:</strong> {item.placement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}




export default Workout_details;