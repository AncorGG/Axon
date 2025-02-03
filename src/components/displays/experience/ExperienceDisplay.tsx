import { Flex, Progress } from "antd";
import "./ExperienceDisplay.css";

type ExperienceDisplayProps = {
  level: number | undefined;
  experience: number | undefined;
};

function ExperienceDisplay(props: ExperienceDisplayProps) {
  const level = props.level;
  const experience = props.experience;

  const leftExp =
    level && experience ? (level + 1) * 100 - experience : undefined;
  const percentage =
    level && experience ? (experience / ((level + 1) * 100)) * 100 : 0;
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
            <p className="exp-current">Level {level ? level : "?"}</p>
            <p className="exp-left">{leftExp ? leftExp : "..."} exp to</p>
            <p className="exp-next">Level {level ? level + 1 : "?"}</p>
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
