import {
  BsChevronDown,
  BsChevronUp,
  BsFloppy,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import "./Routines.css";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { Routine } from "../../../public/models/RoutineListType";
import { useNavigate, useParams } from "react-router-dom";
import { RoutineService } from "../../services/routine.service";
import { Exercise } from "../../../public/models/ExerciseListType";
import { RoutineExerciseService } from "../../services/routine.exercise.service";
import { ExerciseService } from "../../services/exercise.service";

interface RoutineContentProps {
  title: string;
  description: string;
  isNew: boolean;
}

const defaultOptions = [
  { value: "4", label: "Easy" },
  { value: "6", label: "Medium" },
  { value: "8", label: "Hard" },
  { value: "10", label: "Extreme" },
  { value: "1", label: "Hardcore" },
];

const RoutineContent = ({
  title: initialTitle,
  description: initialDescription,
  isNew,
}: RoutineContentProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { id_routine } = useParams();

  useEffect(() => {
    if (id_routine !== "new") {
      fetchExercises();
    }
  }, []);

  const fetchExercises = async () => {
    if (id_routine) {
      try {
        const id = Number(id_routine);
        const data = await RoutineExerciseService.getExerciseByRoutineId(id);
        if (data !== null) {
          const exercisesList = data.map((item) => item.exercise);
          setExercises(exercisesList);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        window.location.reload();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isNew) {
      const newRoutine = {
        routine_name: title,
        description: description,
      };
      console.log(newRoutine);

      try {
        const createRoutine = await RoutineService.addRoutine(newRoutine);
        console.log(createRoutine);
      } catch (error) {
        console.error("Error creating new routine:", error);
      }
    } else {
      if (id_routine) {
        const id = Number(id_routine);
        const updatedRoutine = {
          id_routine: Number(id),
          routine_name: title,
          description: description,
          id_user: 1,
        };
        try {
          const updatedData = await RoutineService.updateRoutine(
            id,
            updatedRoutine
          );
          console.log("Updated routine:", updatedData);
        } catch (error) {
          console.error("Error updating routine:", error);
        }
      }
    }
    navigate("/exercise");
  };

  const handleAddExercise = async () => {
    const newExercise: Exercise = {
      id_exercise: Date.now(),
      exercise_name: "New Exercise",
      difficulty: 4,
      speed: 4,
      experience: 15,
    };

    const sequence_order = exercises.length + 1;

    setExercises((prevExercises) => [...prevExercises, newExercise]);

    if (id_routine) {
      try {
        const id = Number(id_routine);
        await RoutineExerciseService.addExerciseToRoutine(
          id,
          newExercise,
          sequence_order
        );
      } catch (error) {
        console.error("Error adding new exercise:", error);
      }
    }
  };

  const handleDeleteExercise = async (id_exercise: number) => {
    try {
      await ExerciseService.deleteExerciseById(Number(id_routine), id_exercise);
    } catch (error) {
      console.log(error);
    }
    fetchExercises();
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="routine-container">
          <div className="routine-info-container">
            <form onSubmit={handleSubmit}>
              <div className="routine-info-header">
                {" "}
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="routine-info-title"
                  placeholder="Enter routine title"
                />
                <BsFloppy
                  size={26}
                  color="#48612c"
                  className="routine-icon"
                  onClick={handleSubmit}
                />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="routine-info-textarea"
                placeholder="Enter routine description"
              />
            </form>
          </div>

          <div className="routine-list-container">
            <p className="routine-list-title">Exercises ({exercises.length})</p>

            {exercises.length > 0 ? (
              exercises.map((exercise) => (
                <div className="routine-card" key={exercise.id_exercise}>
                  <img
                    src="/images/brain.jpg"
                    alt="Exercise icon"
                    className="routine-card-image"
                  />
                  <div className="routine-card-info">
                    <div className="routine-card-header">
                      <p className="routine-card-text">
                        {exercise.exercise_name}
                      </p>
                      <BsTrash
                        size={24}
                        color="#ff0e0e"
                        className="routine-icon"
                        onClick={() =>
                          handleDeleteExercise(exercise.id_exercise)
                        }
                      />
                    </div>
                    <Select
                      defaultValue={
                        defaultOptions.find(
                          (option) =>
                            option.value === String(exercise.difficulty)
                        )?.value
                      }
                      style={{ width: 120 }}
                      options={defaultOptions}
                    />
                  </div>
                  <div className="routine-card-selectors">
                    <BsChevronUp className="routine-icon" />
                    <BsChevronDown className="routine-icon" />
                  </div>
                </div>
              ))
            ) : (
              <p>No exercises loaded</p>
            )}

            <div className="routine-add-card" onClick={handleAddExercise}>
              <BsPlus size={45} className="routine-plus-icon" />
            </div>
          </div>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
};

export function Routines() {
  const { id_routine } = useParams();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    const fetchRoutine = async () => {
      if (id_routine === "new") {
        setIsCreatingNew(true);
        setRoutine(null);
        return;
      }

      const id = id_routine ? Number(id_routine) : null;

      if (id !== null) {
        try {
          const data = await RoutineService.getRoutineById(id);
          setRoutine(data);
        } catch (error) {
          console.error(`Error fetching routine for ID ${id_routine}:`, error);
        }
      } else {
        console.error("Invalid routine ID");
      }
    };

    fetchRoutine();
  }, [id_routine]);

  if (isCreatingNew) {
    return (
      <RoutineContent
        title="Create New Routine"
        description="Fill out the details to create a new routine."
        isNew={true}
      />
    );
  }

  if (routine) {
    return (
      <RoutineContent
        title={routine.routine_name}
        description={routine.description}
        isNew={false}
      />
    );
  }

  //Default case
  return <div>Loading routine...</div>;
}
