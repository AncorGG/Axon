import "./TestButtons.css";

type TestBtnProp = {
  onContinue?: () => void;
  repeatUrl?: string;
  isActive: boolean;
};

function TestButtons(props: TestBtnProp) {
  const { onContinue, repeatUrl, isActive } = props;

  function continueHandle() {
    if (onContinue && isActive) {
      onContinue();
    }
  }

  function repeatHandle() {
    if (window.location.pathname === repeatUrl && isActive) {
      window.location.reload();
    }
  }

  return (
    <>
      <div className="test-btn-container">
        <button
          className={`test-btn ${isActive ? "btn-repeat" : "btn-inactive"}`}
          onClick={repeatHandle}
        >
          Repeat
        </button>
        <button
          className={`test-btn ${isActive ? "btn-continue" : "btn-inactive"}`}
          onClick={continueHandle}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default TestButtons;
