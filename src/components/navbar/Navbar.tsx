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

  function goto(url: string) {
    navigate(url);
  }

  return (
    <div className="nav-container">
      <div className="nav-icon-container">
        <BsController
          className={`nav-icon ${
            pathname === "/exercise-selector" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/exercise-selector")}
        />
        <BsTrophy
          className={`nav-icon ${
            pathname === "/milestones" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/home")}
        />
        <BsHouseDoor
          className={`nav-icon ${
            pathname === "/home" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/home")}
        />
        <BsGear
          className={`nav-icon ${
            pathname === "/settings" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/home")}
        />
        <BsPerson
          className={`nav-icon ${
            pathname === "/profile" ? "nav-icon-selected" : ""
          }`}
          size={30}
          onClick={() => goto("/home")}
        />
      </div>
    </div>
  );
}

export default Navbar;
