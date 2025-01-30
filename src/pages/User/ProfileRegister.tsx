import {
  BsArrowReturnLeft,
  BsEnvelope,
  BsEye,
  BsLock,
  BsPerson,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Header from "../../components/displays/header/Header";
import "./ProfileRegister.css";
import { register } from "../../services/user.service";

function ProfileRegister() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      postMessage("Usuario registrado con éxito");
      navigate("/user");
    } catch (error) {
      postMessage("Error en el registro");
    }
  };

  const handleDataVerification = (event: FormEvent) => {
    event.preventDefault();

    if (!username || !/^[a-zA-Z0-9_]{3,25}$/.test(username)) {
      setUserError(
        "Please, insert a valid username (3-25 characters, letters and/or numbers)."
      );
      return;
    }

    setUserError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
      setEmailError("Please, insert a valid email address");
      return;
    }

    setEmailError("");

    if (!password || password.length < 8) {
      setPasswordError("Password must contain at least 8 characters");
      return;
    }
    setPasswordError("");
    handleRegister();
  };

  return (
    <div className="user-form-main-container">
      <Header />
      <div className="login-container">
        <p className="form-title">Register</p>
        <div className="form-container">
          <form onSubmit={handleDataVerification} className="log-form">
            <p className="form-label">Username</p>
            <div className="form-input-container">
              <BsPerson size={20} />
              <input
                id="username"
                type="text"
                placeholder="Value"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <span className="error-text">{userError}</span>
            <p className="form-label">Email</p>
            <div className="form-input-container">
              <BsEnvelope size={20} />
              <input
                id="email"
                type="text"
                placeholder="example@gmail.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className="error-text">{emailError}</span>
            <p className="form-label">Password</p>
            <div className="form-input-container">
              <BsLock size={20} />
              <input
                id="password"
                type="text"
                placeholder="*********"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <BsEye size={20} />
            </div>
            <span className="error-text">{passwordError}</span>
            <div className="form-checkbox">
              <input type="checkbox" name="save-pass" id="save-pass" />
              <p className="form-check-text">Save Password?</p>
            </div>
            <div className="form-button-container-reg">
              <button
                type="button"
                className="form-button-reg register-btn"
                onClick={handleDataVerification}
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
