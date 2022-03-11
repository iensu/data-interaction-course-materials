import { useEffect, useState } from "react";
import * as config from "../../config";
import "./styles.css";
import { Link } from "react-router-dom";

const DogListItem = ({ dog }) => (
  <li key={dog._id} className={"dog-list-item"}>
    <Link className="dog-list-item__link" to={`/dogs/${dog._id}`}>
      <img className="dog-list-item__logo" src={dog.url} />
      <span className="dog-list-item__title">{dog.title}</span>
    </Link>
  </li>
);

export const DogList = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/dogs`, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDogs(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ul className="dog-list">
      {dogs.map((dog) => (
        <DogListItem key={dog._id} dog={dog} />
      ))}
    </ul>
  );
};
