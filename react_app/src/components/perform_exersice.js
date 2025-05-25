import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Perform_exersice() {
const { id} = useParams(); 
  const [exersice, setExersice] = useState(null);
  const [placement, setPlacement] = useState(1); 
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(0);


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

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setPlacement((prev) => prev + 1)
      setSeconds(0);};

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!exersice) return <p>Loading exercise...</p>;
  
  return (
    <div>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Exercise number {exersice.placement}</h2>
      <p style={{ display: 'flex', justifyContent: 'center' }}><strong>{exersice.name}</strong> </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {exersice.reps} reps</div>
        <img  src={exersice.gif_url}  style={{ maxWidth: "300px", height: "auto", marginTop: "1rem" }}/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>timer: {seconds} seconds</div>
        <button onClick={handleNext}>Im done!</button>
    </div>
  );
}

export default Perform_exersice; 
