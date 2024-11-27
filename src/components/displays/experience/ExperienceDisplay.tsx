import { Flex, Progress } from "antd";
import "./ExperienceDisplay.css";

function ExperienceDisplay() {
  const percentage: number = 80;
  return (
    <>
      <div className="exp-container">
        <img
          src="/images/lighning-icon.png"
          alt="experience-icon"
          className="exp-image"
        />
        <div className="exp-info-container">
          <div className="exp-text-container">
            <p className="exp-current">Level 5</p>
            <p className="exp-left">356 exp to</p>
            <p className="exp-next">Level 6</p>
          </div>
          <Flex vertical gap="small">
            <Progress
              percent={percentage}
              status={"active"}
              strokeColor={"#f9b924"}
              showInfo={false}
            />
          </Flex>
        </div>
      </div>
    </>
  );
}

export default ExperienceDisplay;
