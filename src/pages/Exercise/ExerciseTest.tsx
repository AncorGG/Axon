import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/displays/header/Header";
import Close from "../../components/navigation/close/Close";
import TestButtons from "../../components/navigation/test_buttons/TestButtons";
import DigitBash from "../../components/displays/digit-bash/DigitBash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../../../public/models/ExerciseListType";
import "./ExerciseTest.css";
import { ExerciseService } from "../../services/exercise.service";

function ExerciseTest() {
  const [mode, setMode] = useState<"read" | "write" | "review">("read");
  const { id_exercise } = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const id = id_exercise ? parseInt(id_exercise) : NaN;
        if (isNaN(id)) {
          console.error("Invalid exercise ID:", id_exercise);
          return;
        }
        const data = await ExerciseService.getExerciseById(id);
        if (data) {
          setExercise(data);
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
