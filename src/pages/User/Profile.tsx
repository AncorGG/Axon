import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import MilestoneDisplay from "../../components/displays/milestone-display/MilestoneDisplay";
import "./Profile.css";
import ExperienceDisplay from "../../components/displays/experience/ExperienceDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";

function Profile() {
  const navitage = useNavigate();

  function logOut() {
    navitage("/user/login");
    console.log("logged out succesfully");
  }

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="profile-container">
          <div className="profile-image-container">
            <div className="profile-icon-contanier" onClick={() => logOut()}>
              <BsBoxArrowRight color="#ffffff" size={25} />
            </div>
          </div>
          <div className="profile-info">
            <p className="profile-title">Pepa</p>
            <p className="profile-email">pepacorreo@gmail.com</p>
          </div>
          <ExperienceDisplay />
          <div className="profile-secondary-container">
            <p className="profile-title">Overview</p>
            <MilestoneDisplay />
          </div>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default Profile;
