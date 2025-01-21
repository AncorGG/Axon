import Header from "../../components/displays/header/Header";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import "./Badges.css";

function Badges() {
  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="badges-content">
          <div className="bages-display-container">
            <img
              className="milestone-badge-logo"
              src="../images/medal.png"
              alt="Badge-logo"
            />
            <div className="badges-display-text">
              <p className="milestone-text -b">Badges Earned</p>
              <p className="milestone-number">54</p>
            </div>
          </div>
          <div className="badge-list">
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
            <div className="badge-card">
              <p className="badge-text">First Steps</p>
              <img className="badge-image" src="../images/medal.png" alt="a" />
            </div>
          </div>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default Badges;
