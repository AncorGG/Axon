import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ExerciseSelector from './pages/Exercise/ExerciseSelector';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/exercise-selector" element={<ExerciseSelector/>}/>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
