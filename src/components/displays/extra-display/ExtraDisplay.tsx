import { useEffect, useState } from "react";
import ExperienceDisplay from "../experience/ExperienceDisplay";
import WeeklyGoals from "../weekly-goals/WeeklyGoals";
import "./ExtraDisplay.css";
import { getUserByUsername } from "../../../services/user.service";
import { User } from "../../../../public/models/User";

const username = sessionStorage.getItem("username");

function ExtraDisplay() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoadingUser(true);
    try {
      if (username) {
        const data = await getUserByUsername(username);
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <>
      {loadingUser ? (
        ""
      ) : (
        <div className="horizontal-display-container">
          <ExperienceDisplay
            level={user?.level}
            experience={user?.experience}
          />
          <WeeklyGoals />
        </div>
      )}
    </>
  );
}

export default ExtraDisplay;
