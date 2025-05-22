import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function WorkoutDetails() {
  const { id } = useParams(); // זה נותן לנו את ה-workout_id מה-URL
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/workouts/${id}/exersices`);
        setExercises(response.data);
      } catch (err) {
        setError("Failed to fetch exercises.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Workout #{id} - Exercises
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <ul>
          {exercises
            .sort((a, b) => a.placement - b.placement)
            .map((ex) => (
              <li key={ex.id}>
                <strong>{ex.name}</strong> — {ex.reps} reps
              </li>

            ))}
        </ul>
      )}
      <button onClick={() => navigate(`/workouts/${id}/perform`)}>start now!</button>
      </h2>
    </div>
  );
}

export default WorkoutDetails;