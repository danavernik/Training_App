import React, { useEffect, useState } from 'react';

function Create_workout() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/exersices')
      .then(res => res.json())
      .then(data => setAllExercises(data))
      .catch(err => console.error("Error fetching exercises:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      user_id: parseInt(userId),
      workout_exersice: selectedExercises.map((exId, index) => ({
        exersice_id: exId,
        reps: 10, 
        placement: index
      }))
    };

    try {
      const response = await fetch('http://localhost:8000/workouts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create workout');
      }

      const result = await response.json();
      setMessage(`Workout "${result.name}" created successfully!`);
      setName('');
      setUserId('');
      setSelectedExercises([]);
    } catch (error) {
      console.error(error);
      setMessage('Error creating workout');
    }
  };

  const handleExerciseChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedExercises(selected);
  };

  return (
    <div>
      <h2>Create New Workout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Workout Name: </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>User ID: </label>
          <input type="number" value={userId} onChange={e => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Select Exercises:</label>
          <select multiple value={selectedExercises.map(String)} onChange={handleExerciseChange}>
            {allExercises.map(ex => (
              <option key={ex.exersice_id} value={ex.exersice_id}>
                {ex.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Workout</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Create_workout;
