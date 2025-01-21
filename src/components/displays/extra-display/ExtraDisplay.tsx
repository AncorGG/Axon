import ExperienceDisplay from "../experience/ExperienceDisplay";
import WeeklyGoals from "../weekly-goals/WeeklyGoals";
import "./ExtraDisplay.css";

function ExtraDisplay() {
  return (
    <>
      <div className="horizontal-display-container">
        <ExperienceDisplay />
        <WeeklyGoals />
      </div>
    </>
  );
}

export default ExtraDisplay;
