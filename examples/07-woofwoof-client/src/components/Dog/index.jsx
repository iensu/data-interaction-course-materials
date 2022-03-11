import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import "./styles.css";

export const Dog = () => {
  const params = useParams();
  const [dog, setDog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dogs/${params.id}`, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.status);
          throw Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((json) => {
        setDog(json);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [params.id]);

  if (!dog && !error) {
    return (
      <div className="dog">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="dog">
        <p className="error">Got error status: {error}</p>
      </div>
    );
  }

  return (
    <div className="dog">
      <h2 className="dog__header">{dog.title}</h2>
      <img className="dog__image" src={dog.url} />
      <div className="dog__info"></div>
    </div>
  );
};
