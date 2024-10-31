import Card from "../../components/card/Card";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <Header />
      <div className="hompage-card-list">
        <Card image="exercise.png" alt="Exercise Image" text="Next Exercise" />
        <Card image="brain.jpg" alt="Brain Image" text="Insights" />
        <Card image="stats.jpg" alt="Stats Image" text="Progress Overview" />
      </div>
      <Navbar />
    </>
  );
}

export default HomePage;
