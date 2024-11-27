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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/exercise" element={<ExerciseSelector />} />
        <Route path="/exercise/test/:id" element={<ExerciseTest />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/milestones/goals" element={<Badges />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/user/login" element={<ProfileLogin />} />
        <Route path="/user/register" element={<ProfileRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
