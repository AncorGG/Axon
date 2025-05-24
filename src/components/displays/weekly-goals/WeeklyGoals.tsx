import { useEffect, useState } from "react";
import GoalProgress from "../goal-progress/GoalProgress";
import seedrandom from "seedrandom";
import "./WeeklyGoals.css";

function WeeklyGoals() {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [goals, setGoals] = useState<any[]>([]);
  const [forceChange, setForceChange] = useState(false);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/models/Milestones.json");
      const data = await response.json();
      const seed = forceChange ? getStoredSeed() : getWeeklySeed();
      console.log("Seed for goals:", seed);
      const randomGoals = getRandomGoals(data.goals, 3, seed);
      console.log("Random goals fetched:", randomGoals);
      setGoals(randomGoals);
    } catch (error) {
      console.error("Error loading goals:", error);
    }
  };

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

      setTimeLeft(`${days}d ${hours}h ${minutes}`);
    };

    calculateTimeLeft();

    const id = setInterval(calculateTimeLeft, 60000);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    fetchGoals();

    const checkWeekChange = setInterval(() => {
      const newSeed = getWeeklySeed();
      const storedSeed = Number(localStorage.getItem("weeklySeed"));
      if (newSeed !== storedSeed) {
        localStorage.setItem("weeklySeed", newSeed.toString());
        fetchGoals();
      }
    }, 3600000);
    
    return () => {
      clearInterval(checkWeekChange);
    };
  }, []);

  function getWeeklySeed() {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    return monday.getFullYear() * 100 + monday.getMonth() * 10 + monday.getDate();
  }

  function getStoredSeed() {
    const storedSeed = localStorage.getItem("weeklySeed");
    return storedSeed ? Number(storedSeed) : getWeeklySeed();
  }

  function getRandomGoals(goalsList: any[], count: number, seed: number) {
    const rng = seedrandom(String(seed));
    const shuffled = [...goalsList].sort(() => rng() - 0.5);
    return shuffled.slice(0, count);
  }

  const forceWeeklyChange = () => {
    setForceChange(true);
    const currentSeed = Number(localStorage.getItem("weeklySeed") || "0");
    const newSeed = currentSeed * 2 + 1;
    localStorage.setItem("weeklySeed", newSeed.toString());
    console.log("Old Seed:", currentSeed, "New Seed:", newSeed);
    fetchGoals();
  };

  return (
    <div className="milestone-goal-container">
      <div className="goals-container">
        <p className="milestone-text -b">Weekly Goals</p>
        <p className="milestone-text">{timeLeft}</p>
      </div>
      <div className="goal-list">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalProgress key={goal.id} title={goal.title} percentage={goal.progress} />
          ))
        ) : (
          <p>No goals available.</p>  // Mensaje por si no hay metas
        )}
      </div>
    </div>
  );
}

export default WeeklyGoals;