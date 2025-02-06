import axios from "axios";

const handleTokenExpiration = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/user/" + sessionStorage.getItem("username"),
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        console.log("Token expirado");
        sessionStorage.removeItem("username");
        sessionStorage.setItem("login", "expired");
        window.location.href = "/user/login";
      }
    } else {
      console.error("Error no relacionado con Axios:", error);
    }
    throw error;
  }
};

export default handleTokenExpiration;
