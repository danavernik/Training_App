import React, { useEffect, useState } from 'react';
import axios from "axios";

function Create_workout() {
  const [name, setName] = useState("");
  const [allExersices, setAllExersices] = useState([]);
  const [selectedExersices, setSelectedExersices] = useState([]);
  const [exName, setExName] = useState("");
  const [muscles, setMuscles] = useState("");
  const [equipment, setEquipment] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
      const params = {};
      if (name) params.name = name;
      const response = await axios.get("http://localhost:8000/search_exersices", { params });
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }
  useEffect(() => {
    axios.get("http://localhost:8000/exersices").then((res) => {
      setAllExersices(res.data);
    });
  }, []);

  const handleAddExersice = (exerciseId) => {
    if (!selectedExersices.find(e => e.exersice_id === exerciseId)) {
      setSelectedExersices([...selectedExersices, { exersice_id: exerciseId, reps: 10 }]);
    }
  };

  const handleRepsChange = (index, reps) => {
    const newList = [...selectedExersices];
    newList[index].reps = reps;
    setSelectedExersices(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/workouts", {
      name,user_id: 1,
      workout_exersices: selectedExersices
    }).then(() => {
      alert("Workout created!");
      setName("");
      setSelectedExersices([]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div style={{ display: 'flex', justifyContent: 'center',marginBottom: '2rem'}}>
        <label className="block font-medium">workout name - </label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label className="block font-medium">choose exersices from the exersices pool</label>
        <div style={{ display: 'flex', justifyContent: 'center' }}>

    </div>
        {allExersices.map(ex => (
          <div key={ex.exersice_id} style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '300px',
        border: '1px solid #ccc',
        padding: '0.5rem',
      }} className="flex justify-between items-center border p-2 mb-1 rounded">
            <span>{ex.name}</span>
            <button type="button" onClick={() => handleAddExersice(ex.exersice_id)} className="bg-blue-500 text-white px-2 py-1 rounded">
              Add
            </button>
          </div>
        ))}
      </div>

      {selectedExersices.length > 0 && (
        <div>
          <h3 className="font-semibold">chosen:</h3>
          {selectedExersices.map((ex, index) => {
            const name = allExersices.find(e => e.exersice_id === ex.exersice_id)?.name || "not found";
            return (
              <div key={index} className="flex items-center space-x-2">
                <span>{index + 1}. {name}</span>
                <input
                  type="number"
                  value={ex.reps}
                  onChange={(e) => handleRepsChange(index, Number(e.target.value))}
                  className="border p-1 w-20"
                />
                <span>repetitions</span>
              </div>
            );
          })}
        </div>
      )}

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">create</button>
    </form>
  );
}


export default Create_workout;
