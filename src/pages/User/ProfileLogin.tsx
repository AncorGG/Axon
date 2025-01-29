import { BsEnvelope, BsEye, BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Header from "../../components/displays/header/Header";
import "./ProfileLogin.css";
import { login } from "../../services/user.service";

function ProfileLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigate("/user/register");
  };

  const handleSignIn = async () => {
    try {
      await login(email, password);
      postMessage("Logeado con éxito");
      navigate("/user");
    } catch (error) {
      postMessage("Error en el login");
    }
  };

  const handleDataVerification = (event: FormEvent) => {
    event.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
      console.error("Please, insert a valid email address");
      return;
    }

    if (!password || password.length < 8) {
      console.error("Password must contain at least 8 characters");
      return;
    }

    handleSignIn();
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
              <input
                type="text"
                placeholder="Value"
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="form-label">Password</p>
            <div className="form-input-container">
              <BsLock size={20} />
              <input
                type="text"
                placeholder="Value"
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
              />
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
                onClick={handleDataVerification}
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
