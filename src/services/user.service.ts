import axios, { AxiosError } from "axios";

const endPoint = "http://localhost:8082";

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${endPoint}/register`, null, {
      params: { username, email, password },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as { message: string; field: string };
    }
    throw { message: "An unexpected error occurred", field: "unknown" };
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${endPoint}/login`, null, {
      params: { username, password },
    });

    sessionStorage.setItem("username", username);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw { message: "An unexpected error occurred", field: "unknown" };
  }
};

export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    await axios.get(`${endPoint}/health`);
    return true;
  } catch (error) {
    return false;
  }
};
