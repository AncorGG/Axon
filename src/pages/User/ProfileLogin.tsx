import { BsArrowRepeat, BsEye, BsLock, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/displays/header/Header";
import "./ProfileLogin.css";
import { checkBackendConnection, login } from "../../services/user.service";
import LostConnection from "../../components/displays/lost-connection/LostConnection";

type ApiError = {
  message: string;
  field: string;
};

function ProfileLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        const isConnected = await checkBackendConnection();
        setConnectionError(!isConnected);
      } catch (error) {
        setConnectionError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyConnection();
  }, []);

  const handleRegister = () => {
    navigate("/user/register");
  };

  useEffect(() => {}, [userError, passwordError]);

  const handleSignIn = async () => {
    try {
      await login(username, password);
      postMessage("Logeado con éxito");
      navigate("/user");
    } catch (error) {
      postMessage("Error en el login");

      const err = error as ApiError;

      if (err.field === "username") {
        setUserError(err.message);
      } else if (err.field === "password") {
        setPasswordError(err.message);
      } else {
        setUserError("Invalid credentials");
        setPasswordError("Invalid credentials");
      }
    }
  };

  const handleDataVerification = (event: FormEvent) => {
    event.preventDefault();

    if (!username || username.length > 25) {
      setUserError("Insert a valid username (max length 25)");
      return;
    }

    setUserError("");

    if (!password || password.length < 8) {
      setPasswordError("Password must contain at least 8 characters");
      return;
    }

    setPasswordError("");
    handleSignIn();
  };

  if (loading) {
    return (
      <div className="user-form-main-container">
        <Header />
        <div className="login-container">
          <p className="form-title">Login</p>
          <div className="form-container">
            <div className="loading-container">
              <BsArrowRepeat className="loading-icon" />
              <p>Cargando...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="user-form-main-container">
        <Header />
        <div className="login-container">
          <p className="form-title">Login</p>
          <LostConnection />
        </div>
      </div>
    );
  }

  return (
    <div className="user-form-main-container">
      <Header />
      <div className="login-container">
        <p className="form-title">Login</p>
        <div className="form-container">
          <form onSubmit={handleDataVerification} className="log-form">
            <p className="form-label">Username</p>
            <div className="form-input-container">
              <BsPerson size={20} />
              <input
                type="text"
                placeholder="Value"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <span className="error-text">{userError}</span>
            <p className="form-label">Password</p>
            <div className="form-input-container">
              <BsLock size={20} />
              <input
                type="password"
                placeholder="*********"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <BsEye size={20} />
            </div>
            <span className="error-text">{passwordError}</span>
            <div className="form-button-container">
              <button
                type="button"
                className="form-button register-btn"
                onClick={() => navigate("/user/register")}
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
