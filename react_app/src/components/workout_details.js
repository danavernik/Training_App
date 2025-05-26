import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function WorkoutDetails() {
  const { id } = useParams(); 
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/workouts/${id}/exersices`);
        setExercises(response.data);
      } catch (err) {
        setError("Failed to find exersices");
        console.error(err);
      }
    };

    fetchExercises();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Exercises
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <ol>
          {exercises
            .sort((a, b) => a.placement - b.placement)
            .map((ex) => (
              <li key={ex.id}>
                <strong>{ex.name}</strong> — {ex.reps} reps
              </li>

            ))}
        </ol>
      )}
      <button onClick={() => navigate(`/workouts/${id}/perform`)}>start now!</button>
      </h2>
    </div>
  );
}

export default WorkoutDetails;