// import dependencies
import React from "react";
import ExerciseTable from "../components/ExerciseTable";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const history = useHistory();

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const exercises = await response.json();
    setExercises(exercises);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const deleteExercise = async (id) => {
    const response = await fetch(`/exercises/${id}`, { method: "DELETE" });
    if (response.status === 204) {
      const getResponse = await fetch("/exercises");
      const exercises = await getResponse.json();
      setExercises(exercises);
    } else {
      console.error(
        `Request to delete exercise with id: ${id} failed. Status code: ${response.status}`
      );
    }
  };

  const editExercise = (exercise) => {
    setExerciseToEdit(exercise);
    history.push("/edit-exercise");
  };

  return (
    <>
      <h2>Your Exercises</h2>
      <ExerciseTable
        exercises={exercises}
        editExercise={editExercise}
        deleteExercise={deleteExercise}
      ></ExerciseTable>
    </>
  );
}

export default HomePage;
