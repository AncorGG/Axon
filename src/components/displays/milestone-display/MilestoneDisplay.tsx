import { useNavigate } from "react-router-dom";
import "./MilestoneDisplay.css";

function MilestoneDisplay() {
  const navigate = useNavigate();

  return (
    <>
      <div className="milestone-display-container">
        <div className="milestone milestone-daystreak">
          <p className="milestone-title">Daystreak</p>
          <p className="milestone-number">17</p>
          <p className="milestone-text">Days</p>
        </div>
        <div
          className="milestone milestone-badges"
          onClick={() => navigate("/milestones/goals")}
        >
          <p className="milestone-title">Badges</p>
          <img
            className="milestone-badge-logo"
            src="images/medal.png"
            alt="Badge-logo"
          />
        </div>
      </div>
    </>
  );
}

export default MilestoneDisplay;
