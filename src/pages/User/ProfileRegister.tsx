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

    if (!username || !/^[a-zA-Z0-9_]{3,15}$/.test(username)) {
      console.error(
        "Please, insert a valid username (3-15 characters, letters and/or numbers)."
      );
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
      console.error("Please, insert a valid email address");
      return;
    }

    if (!password || password.length < 8) {
      console.error("Password must contain at least 8 characters");
      return;
    }

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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
