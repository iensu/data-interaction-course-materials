import { useState, useEffect } from "react";
import { DogList } from "./components/DogList";
import { Dog } from "./components/Dog";
import * as config from "./config";
import "./App.css";

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);

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
    <div className="app">
      <h1 className="app__header">Woof Woof!</h1>
      <div className="app__content">
        <div>
          <DogList
            dogs={dogs}
            selectedDog={selectedDog}
            onSelectDog={setSelectedDog}
          />
        </div>
        <div>{selectedDog ? <Dog dog={selectedDog} /> : null}</div>
      </div>
    </div>
  );
}

export default App;
