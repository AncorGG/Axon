import { useEffect, useState } from "react";
import Card from "../../components/displays/card/Card";
import Navbar from "../../components/navigation/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { exercise } from "../../../public/models/ExerciseListType";
import { Routine } from "../../../public/models/RoutineListType";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";
import Return from "../../components/navigation/return/Return";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import "./ExerciseSelector.css";
import { RoutineService } from "../../services/routine.service";

function ExerciseSelector() {
  const [exercises, setExercises] = useState<exercise[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutines();
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch("/models/ExerciseList.json");
      const text = await response.text();
      const data = JSON.parse(text);
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const fetchRoutines = async () => {
    try {
      const data = await RoutineService.getRoutines();
      setRoutines(data);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };

  const handleCardClick = (exercise: exercise) => {
    navigate(`/exercise/test/${exercise.id}`, { state: { exercise } });
  };

  const handleDeleteRoutine = async (id: number) => {
    try {
      await RoutineService.deleteRoutine(id);
      fetchRoutines();
    } catch (error) {}
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="hompage-card-list">
          <div className="exercise-routine-container">
            <p className="exercise-routine-title">Your Routines</p>
            <div className="exercise-routine-list">
              {routines.map((routine) => (
                <div key={routine.id_routine} className="exercise-routine">
                  <p className="exercise-routine-text">{routine.name}</p>
                  <div className="exercise-routine-icons">
                    <BsPencil
                      size={20}
                      color="#b1590b"
                      onClick={() =>
                        navigate(`/exercise/routines/${routine.id_routine}`)
                      }
                    />
                    <BsTrash
                      size={20}
                      color="#ff0e0e"
                      onClick={() => {
                        if (routine.id_routine !== undefined) {
                          handleDeleteRoutine(routine.id_routine);
                        } else {
                          console.error("Routine ID is undefined");
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="exercise-routine">
                <div className="exercise-routine-add">
                  <BsPlus
                    size={40}
                    onClick={() => navigate(`/exercise/routines/new`)}
                  />
                </div>
              </div>
            </div>
          </div>
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              image="exercise.png"
              alt={`Exercise ${exercise.difficulty} Image`}
              text={`${exercise.name} - ${exercise.difficulty}`}
              onClick={() => handleCardClick(exercise)}
            />
          ))}
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default ExerciseSelector;
