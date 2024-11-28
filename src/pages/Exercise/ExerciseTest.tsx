import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/displays/header/Header";
import Close from "../../components/navigation/close/Close";
import TestButtons from "../../components/navigation/test_buttons/TestButtons";
import DigitBash from "../../components/exercises/digit-bash/DigitBash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../../../public/models/ExerciseListType";
import "./ExerciseTest.css";

function ExerciseTest() {
  const [mode, setMode] = useState<"read" | "write" | "review">("read");
  const { id_exercise } = useParams<{ id_exercise?: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch("/models/ExerciseList.json");
        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }
        const data: Exercise[] = await response.json();

        // Convert `id_exercise` to a number for comparison
        const exerciseId = id_exercise ? parseInt(id_exercise, 10) : NaN;

        if (isNaN(exerciseId)) {
          console.error("Invalid exercise ID:", id_exercise);
          return;
        }

        const foundExercise = data.find(
          (ex) => ex.id_exercise === exerciseId // Compare as numbers
        );

        if (foundExercise) {
          setExercise(foundExercise);
        } else {
          console.error("Exercise not found.");
        }
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    if (id_exercise) {
      fetchExercise();
    }
  }, [id_exercise]);

  const handleContinue = () => {
    if (mode === "read") {
      setMode("write");
    } else if (mode === "write") {
      setMode("review");
    } else if (mode === "review") {
      nav("/exercise");
    }
  };

  const getText = () => {
    switch (mode) {
      case "read":
        return "Remember the following sequence of numbers";
      case "write":
        return "Write down the sequence of numbers in the **shown order**";
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
        digitLength={exercise.difficulty || 6}
        digitSpeed={exercise.speed || 3}
        onReadComplete={handleContinue}
      />
      <TestButtons
        onContinue={handleContinue}
        repeatUrl={`/exercise/test/${exercise.id_exercise}`}
        isActive={mode !== "read"}
      />
    </div>
  );
}

export default ExerciseTest;
