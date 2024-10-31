import "./Card.css";

type Props = {
  image: string;
  alt: string;
  text?: string;
};

function Card(props: Props) {
  const route = props.image;
  const alt = props.alt;
  const text = props.text;

  return (
    <div className="card-container">
      <img src={`images/` + route} alt={alt} className="card-image" />
      <p className="card-text">{text}</p>
    </div>
  );
}

export default Card;
