import React, { useRef , useEffect, useState} from "react";

function Perform_exersice() {
  const [exersices, setExersices] = useState([]);
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
        setExersices(data);
      })
      .catch((err) => {
        console.error('Failed to fetch workouts:', err);
        setError('Something went wrong');
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lets go!!</h1>
      {workouts.map((workout) => (
        <div key={workout.workout_id} style={{ marginBottom: '30px' }}>
          <h2>{workout.name}</h2>
          <ul>
            {exersices.workout_exersice?.map((item) => (
              <li key={item.id}>
                <strong>Exercise:</strong> {item.exersice.name} | <strong>Reps:</strong> {item.reps} | <strong>Placement:</strong> {item.placement}
                <label style={{ marginLeft: '10px' }}>
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={handleCheckboxChange}
                  />
                  האם בוצע?
                </label>
              </li>

            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}




export default Perform_exersice;