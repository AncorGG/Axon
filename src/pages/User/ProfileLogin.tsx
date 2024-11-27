import { BsEnvelope, BsEye, BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import Header from "../../components/displays/header/Header";
import "./ProfileLogin.css";

function ProfileLogin() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/user/register");
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
        <p className="form-title">Login</p>
        <div className="form-container">
          <form onSubmit={handleSignIn} className="log-form">
            <p className="form-label">Email</p>
            <div className="form-input-container">
              <BsEnvelope size={20} />
              <input type="text" placeholder="Value" className="form-input" />
            </div>
            <p className="form-label">Password</p>
            <div className="form-input-container">
              <BsLock size={20} />
              <input type="text" placeholder="Value" className="form-input" />
              <BsEye size={20} />
            </div>
            <div className="form-button-container">
              <button
                type="button"
                className="form-button register-btn"
                onClick={handleRegister}
              >
                Register
              </button>
              <button
                type="button"
                className="form-button singin-btn"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          </form>
          <a href="#" className="form-bottom-text">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileLogin;
