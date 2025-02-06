import axios from "axios";
import { Badge } from "../../public/models/BadgeListType";
import handleTokenExpiration from "../components/navigation/token_expired/TokenExpired";

const endPoint = "http://localhost:8080/api/badges";

export const BadgeService = {
  getBadges: async () => {
    try {
      const response = await axios.get<Badge[]>(
        `${endPoint}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      await handleTokenExpiration();
      throw error;
    }
  },
};
