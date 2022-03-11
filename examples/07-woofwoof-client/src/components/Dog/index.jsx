import "./styles.css";

export const Dog = ({ dog }) => (
  <div className="dog">
    <h2 className="dog__header">{dog.title}</h2>
    <img className="dog__image" src={dog.url} />
    <div className="dog__info"></div>
  </div>
);
