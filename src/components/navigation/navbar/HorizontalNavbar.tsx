import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../displays/header/Header";
import {
  BsController,
  BsGear,
  BsHouseDoor,
  BsPerson,
  BsTrophy,
} from "react-icons/bs";
import "./HorizontalNavbar.css";

function HorizontalNavbar() {
  const nav = useNavigate();
  const location = useLocation();

  const selectedPath = location.pathname;

  return (
    <>
      <div className="horizontal-nav-container">
        <Header />
        <div className="horizontal-nav-option-container">
          <div
            className={`horizontal-nav-option ${
              selectedPath === "/home" ? "option-selected" : ""
            }`}
            onClick={() => {
              nav("/home");
            }}
          >
            <BsHouseDoor size={40} color="#7e9336" />
            <p className="horizontal-nav-text">Home</p>
          </div>
          <div
            className={`horizontal-nav-option ${
              selectedPath === "/exercise" ? "option-selected" : ""
            }`}
            onClick={() => {
              nav("/exercise");
            }}
          >
            <BsController size={40} color="#7e9336" />
            <p className="horizontal-nav-text">Exercises</p>
          </div>
          <div
            className={`horizontal-nav-option ${
              selectedPath === "/milestones" ? "option-selected" : ""
            }`}
            onClick={() => {
              nav("/milestones");
            }}
          >
            <BsTrophy size={40} color="#7e9336" />
            <p className="horizontal-nav-text">Milestones</p>
          </div>
          <div
            className={`horizontal-nav-option ${
              selectedPath === "/user" ? "option-selected" : ""
            }`}
            onClick={() => {
              nav("/user");
            }}
          >
            <BsPerson size={40} color="#7e9336" />
            <p className="horizontal-nav-text">Profile</p>
          </div>
          <div
            className={`horizontal-nav-option ${
              selectedPath === "/settings" ? "option-selected" : ""
            }`}
            onClick={() => {
              nav("/settings");
            }}
          >
            <BsGear size={40} color="#7e9336" />
            <p className="horizontal-nav-text">Settings</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizontalNavbar;
