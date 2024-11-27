import { useEffect, useState } from "react";
import Card from "../../components/displays/card/Card";
import Navbar from "../../components/navigation/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { exercise } from "../../../public/models/ExerciseListType";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";

function ExerciseSelector() {
  const [exercises, setExercises] = useState<exercise[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("/models/ExerciseList.json");
        const text = await response.text();
        const data = JSON.parse(text);
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleCardClick = (exercise: exercise) => {
    navigate(`/exercise/test/${exercise.id}`, { state: { exercise } });
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="hompage-card-list">
        {exercises.map((exercise) => (
          <Card
            key={exercise.id}
            image="exercise.png"
            alt={`Exercise ${exercise.difficulty} Image`}
            text={`${exercise.name} - ${exercise.difficulty}`}
            onClick={() => handleCardClick(exercise)}
          />
        ))}
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default ExerciseSelector;
