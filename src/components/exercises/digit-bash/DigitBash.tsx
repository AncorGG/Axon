import { useState } from "react";
import { BsBullseye, BsLightningCharge } from "react-icons/bs";
import { useEffect } from "react";
import "./DigitBash.css";
import Timer from "../../displays/timer/Timer";

type DigitBashProps = {
  type: string;
  text?: string;
  digitLength: number;
  digitSpeed: number;
  onReadComplete?: () => void;
};

function DigitBash(props: DigitBashProps) {
  const { type, text, digitLength, digitSpeed, onReadComplete } = props;

  const [randomCode, setRandomCode] = useState<string>("");
  const [currentDigitIndex, setCurrentDigitIndex] = useState<number>(-1);
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [accuracy, setAccuracy] = useState<string>("0");

  const exp: number = 35;

  // Generate random code on load
  useEffect(() => {
    if (type === "read") {
      let code = "";
      while (code.length < digitLength) {
        const newDigit = Math.floor(Math.random() * 10).toString();
        if (code.length === 0 || code[code.length - 1] !== newDigit) {
          code += newDigit;
        }
      }
      setRandomCode(code);
      console.log("actual random code: " + code);
      setCurrentDigitIndex(-1);
    }
  }, [type, digitLength]);

  // Update current digit index during "read" mode
  useEffect(() => {
    if (type === "read" && randomCode) {
      let index = 0;
      const intervalTime = digitSpeed * 1000;

      setCurrentDigitIndex(index);

      const interval = setInterval(() => {
        index += 1;
        setCurrentDigitIndex(index);

        if (index >= randomCode.length) {
          clearInterval(interval);

          if (onReadComplete) {
            onReadComplete();
          }
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [type, randomCode, digitSpeed, onReadComplete]);

  //Handle input display
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(-1);
    if (!isNaN(Number(newValue)) && newValue.trim() !== "") {
      setCurrentNumber(newValue);
      setInputText((prev) => {
        const updatedText = prev + newValue;
        calculateAccuracy(updatedText);
        return updatedText;
      });
    }
  };

  //Handle input backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setInputText((prev) => prev.slice(0, -1));
      setCurrentNumber("");
    }
  };

  //Format Text important selection
  function FormatText(input: string | undefined) {
    if (!input) return null;

    const regex = /\*\*(.*?)\*\*/g;
    const parts = input.split(regex);

    return parts.map((part, index) => {
      if (index % 2 !== 0) {
        return (
          <span key={index} style={{ color: "#FFB766", fontWeight: "bold" }}>
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }

  //Review input code vs random code
  function ReviewInput() {
    const result = [];
    for (let i = 0; i < randomCode.length; i++) {
      const isSame = randomCode[i] === inputText[i];

      result.push(
        <span key={i} style={{ color: isSame ? "green" : "red" }}>
          {inputText[i] || "?"}
        </span>
      );
    }
    return result;
  }

  const calculateAccuracy = (input: string) => {
    let correctCount = 0;

    for (let i = 0; i < randomCode.length; i++) {
      if (randomCode[i] === input[i]) {
        correctCount++;
      }
    }

    const accuracyPercent = ((correctCount / randomCode.length) * 100).toFixed(
      2
    );
    setAccuracy(accuracyPercent);
  };

  function RenderContent() {
    switch (type) {
      case "read":
        return (
          <p className="digitb-digit">
            {currentDigitIndex >= 0 && randomCode[currentDigitIndex]}
          </p>
        );
      case "write":
        return (
          <div className="digitb-write-container">
            <input
              className="digitb-current-digit"
              type="text"
              value={currentNumber}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder=""
              autoFocus
            />
            {currentNumber === "" && <span className="digitb-cursor">|</span>}
            <p className="digitb-digit-chain">{inputText}</p>
          </div>
        );
      case "review":
        return (
          <div>
            <p className="digitb-digit-chain">{randomCode}</p>
            <div className="digitb-digit-chain">{ReviewInput()}</div>
          </div>
        );
      default:
        return null;
    }
  }

  function RenderText() {
    if (text) {
      return (
        <div className="digitb-text-container">
          <p className="digitb-text">{FormatText(text)}</p>
        </div>
      );
    } else {
      return (
        <div className="digitb-review-container">
          <div className="digitb-accuracy review-container">
            <BsBullseye size={30} color="#7e9336" />
            <p className="digitb-review-text ">{accuracy} %</p>
          </div>
          <div className="digitb-exp review-container">
            <BsLightningCharge size={30} color="#ffb766" />
            <p className="digitb-review-text">{exp} exp</p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="digitb-container">
        <div className="digitb-digit-container">{RenderContent()}</div>
        <div className="digitb-progress-container">
          <Timer duration={digitSpeed * 1000 * randomCode.length} />
        </div>
        {RenderText()}
      </div>
    </>
  );
}

export default DigitBash;
