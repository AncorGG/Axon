import { BsArrowRepeat, BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import MilestoneDisplay from "../../components/displays/milestone-display/MilestoneDisplay";
import "./Profile.css";
import ExperienceDisplay from "../../components/displays/experience/ExperienceDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";
import { useEffect, useState } from "react";
import { User } from "../../../public/models/User";
import { getUserByUsername } from "../../services/user.service";
import LostConnection from "../../components/displays/lost-connection/LostConnection";

function Profile() {
  const navitage = useNavigate();
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorLoadingUser, setErrorLoadingUser] = useState(false);

  let username: string | null;

  function logOut() {
    sessionStorage.removeItem("username");
    navitage("/user/login");
    console.log("logged out succesfully");
  }

  useEffect(() => {
    username = sessionStorage.getItem("username");
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    setLoadingUser(true);
    try {
      if (username) {
        const data = await getUserByUsername(username);
        setUser(data);
        setErrorLoadingUser(false);
      }
    } catch (error) {
      setErrorLoadingUser(true);
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="profile-container">
          {loadingUser ? (
            <div className="loading-container">
              <BsArrowRepeat className="loading-icon" />
              <p>Loading user...</p>
            </div>
          ) : errorLoadingUser ? (
            <LostConnection text="Failed to load user info" />
          ) : (
            <>
              <div className="profile-image-container">
                <div
                  className="profile-icon-contanier"
                  onClick={() => logOut()}
                >
                  <BsBoxArrowRight color="#ffffff" size={25} />
                </div>
              </div>
              <div className="profile-info">
                <p className="profile-title">
                  {user?.username
                    ? user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)
                    : ""}
                </p>
                <p className="profile-email">{user ? user.email : ""}</p>
              </div>
              <ExperienceDisplay
                level={user?.level}
                experience={user?.experience}
              />
              <div className="profile-secondary-container">
                <p className="profile-title">Overview</p>
                <MilestoneDisplay />
              </div>
            </>
          )}
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
}

export default Profile;
