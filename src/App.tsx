import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ExerciseSelector from "./pages/Exercise/ExerciseSelector";
import Settings from "./pages/Settings/Settings";
import Milestones from "./pages/Milestones/Milestones";
import Badges from "./pages/Milestones/Badges";
import Profile from "./pages/User/Profile";
import ProfileLogin from "./pages/User/ProfileLogin";
import ProfileRegister from "./pages/User/ProfileRegister";
import ExerciseTest from "./pages/Exercise/ExerciseTest";
import { Routines } from "./pages/Routines/Routines";
import ProtectedRoute from "./components/navigation/protected_route/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/login" element={<ProfileLogin />} />
        <Route path="/user/register" element={<ProfileRegister />} />
        <Route
          path="/exercise"
          element={
            <ProtectedRoute>
              <ExerciseSelector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercise/test/:id_exercise"
          element={
            <ProtectedRoute>
              <ExerciseTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercise/routines/:id_routine"
          element={
            <ProtectedRoute>
              <Routines />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/milestones"
          element={
            <ProtectedRoute>
              <Milestones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/milestones/goals"
          element={
            <ProtectedRoute>
              <Badges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
