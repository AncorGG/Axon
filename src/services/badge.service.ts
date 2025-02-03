import axios from "axios";
import { Badge } from "../../public/models/BadgeListType";

const endPoint = "http://localhost:8080/api/badges";

export const BadgeService = {
  getBadges: async () => {
    try {
      const response = await axios.get<Badge[]>(
        `${endPoint}?username=${sessionStorage.getItem("username")}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
