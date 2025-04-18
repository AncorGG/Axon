import axios from "axios";
import { Exercise } from "../../public/models/ExerciseListType";
import handleTokenExpiration from "../components/navigation/token_expired/TokenExpired";

const endPoint = "http://localhost:8080/api/exercises";

export const ExerciseService = {
  getExercises: async () => {
    try {
      const response = await axios.get<Exercise[]>(
        `${endPoint}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  getExerciseById: async (id: number) => {
    try {
      const response = await axios.get<Exercise>(
        `${endPoint}/${id}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  deleteExerciseById: async (id_routine: number, id_exercise: number) => {
    try {
      const response = await axios.delete<Exercise>(
        `${endPoint}/${id_routine}/${id_exercise}?username=${sessionStorage.getItem(
          "username"
        )}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },
};
