import axios from "axios";
import { Routine } from "../../public/models/RoutineListType";
import handleTokenExpiration from "../components/navigation/token_expired/TokenExpired";

const endPoint = "http://localhost:8080/api/routines";

export const RoutineService = {
  getRoutines: async () => {
    try {
      const response = await axios.get<Routine[]>(
        `${endPoint}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  getRoutineById: async (id: number) => {
    try {
      const response = await axios.get<Routine>(
        `${endPoint}/${id}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  getRoutinesByUserId: async (userId: number) => {
    try {
      const response = await axios.get<Routine[]>(
        `${endPoint}/user/${userId}?username=${sessionStorage.getItem(
          "username"
        )}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  addRoutine: async (routine: Routine) => {
    try {
      const response = await axios.post<Routine>(
        `${endPoint}?username=${sessionStorage.getItem("username")}`,
        routine
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  updateRoutine: async (id: number, routine: Routine) => {
    try {
      const response = await axios.put<Routine>(
        `${endPoint}/${id}?username=${sessionStorage.getItem("username")}`,
        routine
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },

  deleteRoutine: async (id: number) => {
    try {
      await axios.delete(
        `${endPoint}/${id}?username=${sessionStorage.getItem("username")}`
      );
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },
};
