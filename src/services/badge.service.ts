import axios from "axios";
import { Badge } from "../../public/models/BadgeListType";

const endPoint = "http://localhost:8080/api/badges";

const username = sessionStorage.getItem("username");

export const BadgeService = {
  getBadges: async () => {
    try {
      const response = await axios.get<Badge[]>(
        `${endPoint}?username=${username}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
