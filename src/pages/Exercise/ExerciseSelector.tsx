import Card from "../../components/card/Card";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

function ExerciseSelector() {
  return (
    <>
      <Header />
      <div className="hompage-card-list">
        <Card image="exercise.png" alt="Exercise Image" text="Exercise 1" />
        <Card image="exercise.png" alt="Exercise Image" text="Exercise 2" />
        <Card image="exercise.png" alt="Exercise Image" text="Exercise 3" />
      </div>
      <Navbar />
    </>
  );
}

export default ExerciseSelector;
