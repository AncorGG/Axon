import GoalProgress from "../goal-progress/GoalProgress";
import "./WeeklyGoals.css";

function WeeklyGoals() {
  return (
    <>
      <div className="milestone-goal-container">
        <div className="goals-container">
          <p className="milestone-text -b">Weekly Goals</p>
          <p className="milestone-text">3d 12h 5'</p>
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
