import { useNavigate } from "react-router-dom";
import Card from "../../components/displays/card/Card";
import Navbar from "../../components/navigation/navbar/Navbar";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import "./HomePage.css";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";

function HomePage() {
  const nav = useNavigate();
  return (
    <div className="main-container">
      <HorizontalNavbar />

      <div className="hompage-card-list">
        <Card
          image="exercise.png"
          alt="Exercise Image"
          text="Next Exercise"
          onClick={() => {
            nav("/exercise/test/2");
          }}
        />
        <Card image="brain.jpg" alt="Brain Image" text="Insights" />
        <Card image="stats.jpg" alt="Stats Image" text="Progress Overview" />
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default HomePage;
