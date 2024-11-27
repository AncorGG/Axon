import {
  BsArrowReturnLeft,
  BsEnvelope,
  BsEye,
  BsLock,
  BsPerson,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import Header from "../../components/displays/header/Header";
import "./ProfileRegister.css";

function ProfileRegister() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/user");
  };

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault();
    navigate("/user");
    console.log("Form submitted");
  };

  return (
    <div className="user-form-main-container">
      <Header />
      <div className="login-container">
        <p className="form-title">Register</p>
        <div className="form-container">
          <form onSubmit={handleSignIn} className="log-form">
            <p className="form-label">Username</p>
            <div className="form-input-container">
              <BsPerson size={20} />
              <input
                id="username"
                type="text"
                placeholder="Value"
                className="form-input"
              />
            </div>
            <p className="form-label">Email</p>
            <div className="form-input-container">
              <BsEnvelope size={20} />
              <input
                id="email"
                type="text"
                placeholder="Value"
                className="form-input"
              />
            </div>
            <p className="form-label">Password</p>
            <div className="form-input-container">
              <BsLock size={20} />
              <input
                id="password"
                type="text"
                placeholder="Value"
                className="form-input"
              />
              <BsEye size={20} />
            </div>
            <div className="form-checkbox">
              <input type="checkbox" name="save-pass" id="save-pass" />
              <p className="form-check-text">Save Password?</p>
            </div>
            <div className="form-button-container-reg">
              <button
                type="button"
                className="form-button-reg register-btn"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
          <div className="form-bottom-container">
            <BsArrowReturnLeft />
            <a href="/user/login" className="form-bottom-text-reg">
              return to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileRegister;
