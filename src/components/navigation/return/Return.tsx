import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Return.css";

function Return() {
  const navigate = useNavigate();

  return (
    <>
      <div className="return-container" onClick={() => navigate(-1)}>
        <BsChevronLeft className="return-icon" size={35} />
        <p className="return-text">Return</p>
      </div>
    </>
  );
}

export default Return;
