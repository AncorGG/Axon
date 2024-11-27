import { BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Close.css";

type ReturnProp = {
  action?: string;
};

function Close(props: ReturnProp) {
  const nav = useNavigate();
  const action = props.action;

  function handleNavigate() {
    if (action === "home") {
      nav("/home");
    } else {
      nav(-1);
    }
  }

  return (
    <>
      <div className="close-container" onClick={handleNavigate}>
        <BsXLg className="close-icon" size={35} />
      </div>
    </>
  );
}

export default Close;
