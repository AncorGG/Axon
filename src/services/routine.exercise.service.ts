import axios from "axios";
import { ExerciseResponse } from "../../public/models/ExerciseListType";

const endPoint = "http://localhost:8080/api/routine-exercise";

export const RoutineExerciseService = {
  getExerciseByRoutineId: async (id: number) => {
    try {
      const response = await axios.get<ExerciseResponse[]>(`${endPoint}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
