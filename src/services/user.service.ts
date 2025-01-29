import axios from "axios";

const endPoint = "http://localhost:8082";

export const register = async (username: any, email: any, password: any) => {
  try {
    const response = await axios.post(`${endPoint}/register`, null, {
      params: { username, email, password },
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const login = async (username: any, password: any) => {
  try {
    const response = await axios.post(`${endPoint}/login`, null, {
      params: { username, password },
    });
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};
