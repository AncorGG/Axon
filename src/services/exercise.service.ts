import axios from "axios";
import { Exercise } from "../../public/models/ExerciseListType";

const endPoint = "http://localhost:8080/api/exercises";

export const ExerciseService = {
  getExercises: async () => {
    try {
      const response = await axios.get<Exercise[]>(endPoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getExerciseById: async (id: number) => {
    try {
      const response = await axios.get<Exercise>(`${endPoint}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
