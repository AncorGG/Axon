import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import MilestoneDisplay from "../../components/displays/milestone-display/MilestoneDisplay";
import "./Milestones.css";
import WeeklyGoals from "../../components/displays/weekly-goals/WeeklyGoals";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";

function Milestones() {
  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container ">
        <Return />
        <MilestoneDisplay />
        <WeeklyGoals />
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default Milestones;
