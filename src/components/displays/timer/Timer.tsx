import React, { useEffect, useState } from "react";
import { Progress } from "antd";

const Timer: React.FC<{
  duration: number;
  onComplete?: () => void;
}> = ({ duration, onComplete }) => {
  const [percent, setPercent] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const startTimer = () => {
      setStartTime(Date.now());
      const animate = () => {
        if (startTime) {
          const elapsed = Date.now() - startTime;
          const newPercent = Math.max(100 - (elapsed / duration) * 100, 0);
          setPercent(newPercent);

          if (newPercent > 0) {
            requestAnimationFrame(animate);
          } else {
            if (onComplete) onComplete();
          }
        }
      };

      requestAnimationFrame(animate);
    };

    startTimer();

    return () => {
      setPercent(100);
      setStartTime(null);
    };
  }, [duration, onComplete]);

  return (
    <Progress
      percent={percent}
      showInfo={false}
      strokeColor={{
        "0%": "#FFB766",
        "100%": "#B1590B",
      }}
      trailColor="#d9d9d9"
    />
  );
};

export default Timer;
