import axios from "axios";
import {
  Exercise,
  ExerciseResponse,
} from "../../public/models/ExerciseListType";

const endPoint = "http://localhost:8080/api/routine-exercise";

export const RoutineExerciseService = {
  getExerciseByRoutineId: async (id: number) => {
    try {
      const response = await axios.get<ExerciseResponse[]>(`${endPoint}/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  addExerciseToRoutine: async (
    id_routine: number,
    exercise: Exercise,
    sequence_order: number
  ) => {
    const routineExercise = {
      routine: { id_routine },
      exercise,
      sequence_order,
    };

    try {
      const response = await axios.post(
        `${endPoint}/${id_routine}`,
        routineExercise,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding exercise to routine:", error);
      throw error;
    }
  },
};
