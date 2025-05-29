import { useParams } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import axios from "axios";

function Perform_exersice() {
const { id} = useParams(); 
  const [exersice, setExersice] = useState(null);
  const [placement, setPlacement] = useState(1); 
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(0);
  const intervalRef = useRef(null);

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
      if (isRunning) {
        intervalRef.current = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePauseResume = () => {
  setIsRunning(prev => !prev);
  };

  const handleNext = async () => {
    const data = {
      time_progress: seconds,
      accomplished: true,
      user_id: 1,
      workout_id: Number(id),
      exersice_id: exersice.id
    };
    try {
      const response = await axios.post("http://localhost:8000/progress", data);
      alert("Progress data saved!");
      }
    catch (error) {
      if (error.response) {
        console.error("Server error:");
        console.error("Status:", error.response.status);
        console.error("Body:", error.response.data);
        alert(`Error saving progress: ${error.response.status}`);
    } else {
    console.error("Error:", error.message);
    alert(`Error saving progress: ${error.message}`);
    }
  }
    setPlacement((prev) => prev + 1)
    setSeconds(0);
    setIsRunning(prev => !prev);
    };

  
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
        <button onClick={handlePauseResume}>start/pause</button>


    </div>
  );
}

export default Perform_exersice; 
