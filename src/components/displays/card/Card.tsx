import React, { useRef } from "react";
import "./Card.css";

type Props = {
  image: string;
  alt: string;
  text?: string;
  onClick?: () => void;
  href?: string;
};

function Card(props: Props) {
  const { image, alt, text, onClick, href } = props;
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = () => {
    if (href && cardRef.current) {
      const aTag = document.createElement("a");
      aTag.href = href;
      aTag.target = "_blank";
      aTag.rel = "noopener noreferrer";
      cardRef.current?.appendChild(aTag);
      aTag.click();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="card-container" onClick={handleCardClick} ref={cardRef}>
      <img src={`images/` + image} alt={alt} className="card-image" />
      <p className="card-text">{text}</p>
    </div>
  );
}

export default Card;
