import "./LostConnection.css";
import { BsWifiOff } from "react-icons/bs";

type LostConnectionProps = {
  text?: string;
};

function LostConnection(props: LostConnectionProps) {
  const text = props.text ? props.text : "Connection failed!";

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="lost-connection-container">
      <BsWifiOff size={40} />
      <p className="lost-connection-text">{text}</p>
      <button className="lost-connection-btn" onClick={handleReload}>
        Retry
      </button>
    </div>
  );
}

export default LostConnection;
