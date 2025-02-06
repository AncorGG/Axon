import { useNavigate } from "react-router-dom";
import "./LostConnection.css";
import { BsWifiOff } from "react-icons/bs";
import { useEffect } from "react";

type LostConnectionProps = {
  text?: string;
  error?: any;
};

function LostConnection(props: LostConnectionProps) {
  const { text, error } = props;
  const navigate = useNavigate();

  let message = text ? text : "Connection failed!";

  let buttonText = "Retry";
  let handleAction = () => window.location.reload();

  useEffect(() => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      message = "Session expired";
      buttonText = "Login";
      handleAction = () => navigate("/user/login");
    }
  }, [error, navigate]);

  return (
    <div className="lost-connection-container">
      <BsWifiOff size={40} />
      <p className="lost-connection-text">{message}</p>
      <button className="lost-connection-btn" onClick={handleAction}>
        Retry
      </button>
    </div>
  );
}

export default LostConnection;
