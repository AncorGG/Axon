import ExperienceDisplay from "../../displays/experience/ExperienceDisplay";
import WeeklyGoals from "../../displays/weekly-goals/WeeklyGoals";
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
