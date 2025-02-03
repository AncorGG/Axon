import axios from "axios";
import { ExerciseResponse } from "../../public/models/ExerciseListType";

const endPoint = "http://localhost:8080/api/routine-exercise";

export const RoutineExerciseService = {
  getExerciseByRoutineId: async (id: number) => {
    try {
      const response = await axios.get<ExerciseResponse[]>(
        `${endPoint}/${id}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  },

  addExerciseToRoutine: async (
    routineId: number,
    exerciseId: number,
    sequenceOrder: number
  ) => {
    try {
      const response = await axios.post(
        `${endPoint}/${routineId}/${exerciseId}/${sequenceOrder}?username=${sessionStorage.getItem(
          "username"
        )}`
      );
      return response.data;
    } catch (error) {
      console.error("Error adding exercise to routine:", error);
      throw error;
    }
  },
};
