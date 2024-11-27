import { useEffect, useState } from "react";
import Card from "../../components/displays/card/Card";
import Navbar from "../../components/navigation/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { exercise } from "../../../public/models/ExerciseListType";
import { routine } from "../../../public/models/RoutineListType";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";
import Return from "../../components/navigation/return/Return";
import { BsPencil, BsPlus, BsTrash } from "react-icons/bs";
import "./ExerciseSelector.css";

function ExerciseSelector() {
  const [exercises, setExercises] = useState<exercise[]>([]);
  const [routines, setRoutines] = useState<routine[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        const response = await fetch("/models/RoutineList.json");
        const text = await response.text();
        const data = JSON.parse(text);
        setRoutines(data);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    fetchRoutines();
    fetchExercises();
  }, []);

  const handleCardClick = (exercise: exercise) => {
    navigate(`/exercise/test/${exercise.id}`, { state: { exercise } });
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
                      onClick={() => console.log("Delete item")}
                    />
                  </div>
                </div>
              ))}
              <div className="exercise-routine">
                  <div className="exercise-routine-add">
                    <BsPlus
                      size={40}
                      onClick={() => navigate(`/exercise/routines/`)}
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
