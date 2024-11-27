import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/displays/header/Header";
import Close from "../../components/navigation/close/Close";
import TestButtons from "../../components/navigation/test_buttons/TestButtons";
import DigitBash from "../../components/displays/digit-bash/DigitBash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { exercise } from "../../../public/models/ExerciseListType";
import "./ExerciseTest.css";

function ExerciseTest() {
  const [mode, setMode] = useState<"read" | "write" | "review">("read");

  const { id } = useParams();
  const nav = useNavigate();
  const [exercise, setExercise] = useState<exercise | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch(`/models/ExerciseList.json`);
        const exercises: exercise[] = await response.json();
        const selectedExercise = exercises.find(
          (ex) => ex.id === parseInt(id!)
        );
        setExercise(selectedExercise || null);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };
    if (id) {
      fetchExercise();
    }
  }, [id]);

  const handleContinue = () => {
    if (mode === "read") {
      setMode("write");
    } else if (mode === "write") {
      setMode("review");
    } else if (mode === "review") {
      nav("/home");
    }
  };

  const getText = () => {
    switch (mode) {
      case "read":
        return "Remember the following sequence of numbers";
      case "write":
        return "Write down the sequence of numbers in **reverse order**";
      default:
        return "";
    }
  };

  if (!exercise) {
    return (
      <div>
        <Header />
        <div>Loading exercise...</div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="test-container">
      <Header />
      <Close action="home" />
      <DigitBash
        type={mode}
        text={getText()}
        digitLength={exercise.digitLenght || 8}
        digitSpeed={exercise.digitSpeed || 0}
        onReadComplete={handleContinue}
      />
      <TestButtons
        onContinue={handleContinue}
        repeatUrl={`/exercise/test/${exercise.id}`}
        isActive={mode !== "read"}
      />
    </div>
  );
}

export default ExerciseTest;
