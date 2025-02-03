import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsPlus, BsTrash, BsArrowRepeat } from "react-icons/bs";
import Card from "../../components/displays/card/Card";
import Navbar from "../../components/navigation/navbar/Navbar";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";
import Return from "../../components/navigation/return/Return";
import LostConnection from "../../components/displays/lost-connection/LostConnection";
import { Exercise } from "../../../public/models/ExerciseListType";
import { Routine } from "../../../public/models/RoutineListType";
import { RoutineService } from "../../services/routine.service";
import { ExerciseService } from "../../services/exercise.service";
import "./ExerciseSelector.css";
import { getUserByUsername } from "../../services/user.service";

function ExerciseSelector() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(true);
  const [loadingRoutines, setLoadingRoutines] = useState(true);
  const [errorExercises, setErrorExercises] = useState(false);
  const [errorRoutines, setErrorRoutines] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutines();
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    setLoadingExercises(true);
    try {
      const data = await ExerciseService.getExercises();
      setExercises(data);
      setErrorExercises(false);
    } catch (error) {
      setErrorExercises(true);
    } finally {
      setLoadingExercises(false);
    }
  };

  const fetchRoutines = async () => {
    setLoadingRoutines(true);
    const username = sessionStorage.getItem("username");
    if (username) {
      try {
        const user = await getUserByUsername(username);

        if (user?.id) {
          const data = await RoutineService.getRoutinesByUserId(user.id);

          setRoutines(data);
          setErrorRoutines(false);
        } else {
          setErrorRoutines(true);
        }
      } catch (error) {
        setErrorRoutines(true);
      } finally {
        setLoadingRoutines(false);
      }
    }
  };

  const handleCardClick = (exercise: Exercise) => {
    navigate(`/exercise/test/${exercise.id_exercise}`, {
      state: { exercise },
    });
  };

  const handleDeleteRoutine = async (id: number) => {
    try {
      await RoutineService.deleteRoutine(id);
      fetchRoutines();
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="hompage-card-list">
          <div className="exercise-routine-container">
            {loadingRoutines ? (
              <div className="loading-container">
                <BsArrowRepeat className="loading-icon" />
                <p>Loading routines...</p>
              </div>
            ) : errorRoutines ? (
              <LostConnection text="Failed to load routines." />
            ) : (
              <>
                <p className="exercise-routine-title">Your Routines</p>
                <div className="exercise-routine-list">
                  {routines.map((routine) => (
                    <div key={routine.id_routine} className="exercise-routine">
                      <p className="exercise-routine-text">
                        {routine.routine_name}
                      </p>
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
                  <div
                    className="exercise-routine"
                    onClick={() => navigate(`/exercise/routines/new`)}
                  >
                    <div className="exercise-routine-add">
                      <BsPlus size={40} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {loadingExercises ? (
            <div className="loading-container">
              <BsArrowRepeat className="loading-icon" />
              <p>Loading exercises...</p>
            </div>
          ) : errorExercises ? (
            <LostConnection text="Failed to load exercises." />
          ) : (
            exercises.map((exercise) => (
              <Card
                key={exercise.id_exercise}
                image="exercise.png"
                alt={`Exercise ${exercise.difficulty} Image`}
                text={`${exercise.exercise_name}`}
                onClick={() => handleCardClick(exercise)}
              />
            ))
          )}
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default ExerciseSelector;
