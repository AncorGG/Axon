import "./Card.css";

type Props = {
  image: string;
  alt: string;
  text?: string;
  onClick?: () => void;
};

function Card(props: Props) {
  const { image, alt, text, onClick } = props;

  return (
    <div className="card-container" onClick={onClick}>
      <img src={`images/` + image} alt={alt} className="card-image" />
      <p className="card-text">{text}</p>
    </div>
  );
}

export default Card;
