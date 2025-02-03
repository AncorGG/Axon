import { useEffect, useState } from "react";
import GoalProgress from "../goal-progress/GoalProgress";
import "./WeeklyGoals.css";

function WeeklyGoals() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMonday = new Date();

      nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
      nextMonday.setHours(1, 0, 0, 0);

      if (now > nextMonday) {
        nextMonday.setDate(nextMonday.getDate() + 7);
      }

      const difference = nextMonday.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}'`);
    };

    calculateTimeLeft();

    const id = setInterval(calculateTimeLeft, 60000);
    setIntervalId(id);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <>
      <div className="milestone-goal-container">
        <div className="goals-container">
          <p className="milestone-text -b">Weekly Goals</p>
          <p className="milestone-text">{timeLeft}</p>
        </div>
        <div className="goal-list">
          <GoalProgress percentage={70} />
          <GoalProgress percentage={100} />
          <GoalProgress percentage={25} />
        </div>
      </div>
    </>
  );
}

export default WeeklyGoals;
