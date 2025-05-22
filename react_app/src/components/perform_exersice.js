import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Perform_exersice() {
const { id} = useParams(); 
  const [exersice, setExersice] = useState(null);
  const [placement, setPlacement] = useState(1); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/workouts/${id}/perform/`, {params: { placement }});
        setExersice(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No more exercises!");
        setExersice(null);
      }
    };

    fetchExercise();
  }, [id, placement]);

  const handleNext = () => {
    setPlacement((prev) => prev + 1);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!exersice) return <p>Loading exercise...</p>;

  return (
    <div>
      <h2>Exercise #{exersice.placement}</h2>
      <p><strong>{exersice.name}</strong> — {exersice.reps} reps</p>
      <button onClick={handleNext}>Next Exercise</button>
    </div>
  );
}



export default Perform_exersice; 
