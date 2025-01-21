import {
  BsChevronDown,
  BsChevronUp,
  BsFloppy,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import "./Routines.css";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { Routine } from "../../../public/models/RoutineListType";
import { useParams } from "react-router-dom";
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
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [tempExercises, setTempExercises] = useState<Exercise[]>([]);
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
          setTempExercises(exercisesList);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
        window.location.reload();
      }
    }
  };

  async function getExistingRoutineExercises(id: number) {
    try {
      return await RoutineExerciseService.getExerciseByRoutineId(id);
    } catch (error) {
      console.error("Error fetching existing exercises:", error);
      throw error;
    }
  }

  async function addAllNewExercises(id: number, tempExercises: any[]) {
    for (const [index, exercise] of tempExercises.entries()) {
      const sequence_order = index + 1;
      await handleExerciseAddition(id, exercise.id_exercise, sequence_order);
    }
  }

  async function addNewExercises(
    id: number,
    existingRoutineExercises: any[],
    tempExercises: any[]
  ) {
    const existingExerciseIds = existingRoutineExercises.map(
      (rel) => rel.exercise.id_exercise
    );

    const newExercises = tempExercises.filter(
      (exercise) => !existingExerciseIds.includes(exercise.id_exercise)
    );

    for (const [index, exercise] of newExercises.entries()) {
      const sequence_order = existingRoutineExercises.length + index + 1;
      await handleExerciseAddition(id, exercise.id_exercise, sequence_order);
    }
  }

  async function handleExerciseAddition(
    id: number,
    exerciseId: number,
    sequenceOrder: number
  ) {
    try {
      await RoutineExerciseService.addExerciseToRoutine(
        id,
        exerciseId,
        sequenceOrder
      );
    } catch (error) {
      console.error(
        `Error adding exercise with ID ${exerciseId} to routine:`,
        error
      );
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isNew) {
      const newRoutine = {
        routine_name: title,
        description: description,
      };

      try {
        const createRoutine = await RoutineService.addRoutine(newRoutine);

        if (createRoutine && createRoutine.id_routine) {
          const newRoutineId = createRoutine.id_routine;
          await addAllNewExercises(newRoutineId, tempExercises);
        } else {
          console.error("Failed to get the ID of the newly created routine.");
        }
      } catch (error) {
        console.error("Error creating new routine:", error);
      }
    } else {
      if (id_routine) {
        const id = Number(id_routine);
        const updatedRoutine = {
          id_routine: id,
          routine_name: title,
          description: description,
          id_user: 1,
        };

        // Update Routine
        try {
          await RoutineService.updateRoutine(id, updatedRoutine);
        } catch (error) {
          console.error("Error updating routine:", error);
        }

        // Update RoutineExercise
        try {
          const existingRoutineExercises = await getExistingRoutineExercises(
            id
          );

          if (existingRoutineExercises && existingRoutineExercises.length > 0) {
            const existingExerciseIds = existingRoutineExercises.map(
              (rel) => rel.exercise.id_exercise
            );

            // Find exercises to delete
            const exercisesToDelete = existingExerciseIds.filter(
              (id_exercise) =>
                !tempExercises.some(
                  (exercise) => exercise.id_exercise === id_exercise
                )
            );

            for (const id_exercise of exercisesToDelete) {
              await handleDeleteExercise(id_exercise);
            }

            await addNewExercises(id, existingRoutineExercises, tempExercises);
          } else {
            await addAllNewExercises(id, tempExercises);
          }
        } catch (error) {
          console.error("Error managing routine exercises:", error);
        }
      }
    }
  };

  const handleAddExercise = async () => {
    const availableExercises = await ExerciseService.getExercises();

    const exercisesInRoutine = tempExercises.map((e) => e.id_exercise);
    const filteredExercises = availableExercises.filter(
      (exercise) => !exercisesInRoutine.includes(exercise.id_exercise)
    );

    if (filteredExercises.length === 0) {
      console.log("Todos los ejercicios disponibles ya están en la lista.");
      return;
    }

    const newExercise = filteredExercises[0];

    setTempExercises((prevExercises) => [...prevExercises, newExercise]);
  };

  const handleDeleteExercise = async (id_exercise: number) => {
    try {
      await ExerciseService.deleteExerciseById(Number(id_routine), id_exercise);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTempExercise = (id_exercise: number) => {
    const updatedTempExercises = tempExercises.filter(
      (exercise) => exercise.id_exercise !== id_exercise
    );
    setTempExercises(updatedTempExercises);
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

            {tempExercises.length > 0 ? (
              tempExercises.map((exercise) => (
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
                          handleRemoveTempExercise(exercise.id_exercise)
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
