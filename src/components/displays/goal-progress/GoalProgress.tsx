import { Flex, Progress } from "antd";
import "./GoalProgress.css";
import { useEffect } from "react";

type GoalProps = {
  percentage: number;
};

function GoalProgress({ percentage }: GoalProps) {
  useEffect(() => checkPercentage(), []);

  function checkPercentage() {
    console.log("checked");
  }

  return (
    <div className="goal-card">
      <p className="goal-text">Take on Digit Bash Exercises</p>
      <div className="goal-progress-container">
        <Flex vertical gap="small" className="goal-flex-container">
          <Progress
            percent={percentage}
            status={percentage === 100 ? "normal" : "active"}
            percentPosition={{ align: "center", type: "inner" }}
            strokeColor={percentage === 100 ? "#7e9336" : "#f9b924"}
            trailColor="#5D4A41"
          />
        </Flex>
      </div>
    </div>
  );
}

export default GoalProgress;
