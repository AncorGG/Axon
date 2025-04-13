import Navbar from "../../components/navigation/navbar/Navbar";
import Header from "../../components/displays/header/Header";
import Close from "../../components/navigation/close/Close";
import TestButtons from "../../components/navigation/test_buttons/TestButtons";
import DigitBash from "../../components/exercises/digit-bash/DigitBash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../../../public/models/ExerciseListType";
import "./ExerciseTest.css";
import { ExerciseService } from "../../services/exercise.service";
import LostConnection from "../../components/displays/lost-connection/LostConnection";
import { User } from "../../../public/models/User";
import { getUserByUsername, updateUserExp } from "../../services/user.service";

function ExerciseTest() {
  const [mode, setMode] = useState<"read" | "write" | "review">("read");
  const { id_exercise } = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [user, setUser] = useState<User>();
  const [errorLoadingUser, setErrorLoadingUser] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const nav = useNavigate();
  const [earnedExp, setEarnedExp] = useState<number>(0);

  const fetchUserInfo = async () => {
    try {
      if (username) {
        const data = await getUserByUsername(username);
        setUser(data);
        setErrorLoadingUser(false);
      } else {
        console.warn("No username found in sessionStorage");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setErrorLoadingUser(true);
    }
  };

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const id = id_exercise ? parseInt(id_exercise) : NaN;
        if (isNaN(id)) {
          console.error("Invalid exercise ID:", id_exercise);
          return;
        }
        const data = await ExerciseService.getExerciseById(id);
        setExercise(data || null);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
    if (id_exercise) fetchExercise();
  }, [id_exercise]);

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  useEffect(() => {
    if (mode === "review") {
      const interval = setInterval(fetchUserInfo, 3000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  useEffect(() => {
    const updateExp = async () => {
      if (mode === "review" && user && username && earnedExp > 0) {
        try {
          console.log("Ganaste EXP:", earnedExp);
          await updateUserExp(user.id ?? 0, earnedExp, username);
        } catch (err) {
          console.error("Error al actualizar la experiencia:", err);
        }
      }
    };
  
    updateExp();
  }, [mode, earnedExp, user, username]);
  

  const handleContinue = async () => {
    if (mode === "read") {
      setMode("write");
    } else if (mode === "write") {
      if (!user || !exercise || !username) {
        console.error("Missing user, exercise, or username data");
        return;
      }
  
      try {
        setMode("review");
      } catch (error) { 
        console.error("Error updating user experience:", error);
      }
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

  if (!exercise || errorLoadingUser) {
    return (
      <div className="test-container">
        <Header />
        <LostConnection />
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
        onReadComplete={() => handleContinue()}
        onExperienceComplete={(exp) => setEarnedExp(exp)}
      />
      <TestButtons
        onContinue={() => handleContinue()}
        repeatUrl={`/exercise/test/${exercise.id_exercise}`}
        isActive={mode !== "read"}
      />
    </div>
  );
}

export default ExerciseTest;
