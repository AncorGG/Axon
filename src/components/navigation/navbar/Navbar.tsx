import {
  BsHouseDoor,
  BsGear,
  BsPerson,
  BsController,
  BsTrophy,
} from "react-icons/bs";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const selectedPath = [
    "/exercise",
    "/exercise/test",
    "/exercise/write",
    "/exercise/review",
    "/milestones",
    "/milestones/goals",
    "/settings",
    "/user",
  ].includes(pathname)
    ? pathname
    : "/home";

  function goto(url: string) {
    navigate(url);
  }

  return (
    <div className="nav-container">
      <div className="nav-icon-container">
        <BsController
          data-testid="exercise-icon"
          className={`nav-icon ${
            selectedPath === "/exercise" ||
            selectedPath === "/exercise/test" ||
            selectedPath === "/exercise/write" ||
            selectedPath === "/exercise/review"
              ? "nav-icon-selected"
              : ""
          }`}
          size={30}
          onClick={() => goto("/exercise")}
        />
        <BsTrophy
          data-testid="milestones-icon"
          className={`nav-icon ${
            selectedPath === "/milestones" ||
            selectedPath === "/milestones/goals"
              ? "nav-icon-selected"
              : ""
          }`}
          size={30}
          onClick={() => goto("/milestones")}
        />
        <BsHouseDoor
          data-testid="home-icon"
          className={`nav-icon ${
            selectedPath === "/home" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/home")}
        />
        <BsGear
          data-testid="settings-icon"
          className={`nav-icon ${
            selectedPath === "/settings" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/settings")}
        />
        <BsPerson
          data-testid="user-icon"
          className={`nav-icon ${
            selectedPath === "/user" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/user")}
        />
      </div>
    </div>
  );
}

export default Navbar;
