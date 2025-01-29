import axios from "axios";
import { Routine } from "../../public/models/RoutineListType";

const endPoint = "http://localhost:8080/api/routines";

const username = "testAdmin";

export const RoutineService = {
  getRoutines: async () => {
    try {
      const response = await axios.get<Routine[]>(
        `${endPoint}?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRoutineById: async (id: number) => {
    try {
      const response = await axios.get<Routine>(
        `${endPoint}/${id}?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addRoutine: async (routine: Routine) => {
    try {
      const response = await axios.post<Routine>(
        `${endPoint}?username=${username}`,
        routine
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateRoutine: async (id: number, routine: Routine) => {
    try {
      const response = await axios.put<Routine>(
        `${endPoint}/${id}?username=${username}`,
        routine
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRoutine: async (id: number) => {
    try {
      await axios.delete(`${endPoint}/${id}?username=${username}`);
    } catch (error) {
      throw error;
    }
  },
};
