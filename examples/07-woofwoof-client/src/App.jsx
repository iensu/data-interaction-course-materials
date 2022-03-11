import { DogList } from "./components/DogList";
import { Dog } from "./components/Dog";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h1 className="app__header">Woof Woof!</h1>
      <div className="app__content">
        <Routes>
          <Route path="/" element={<DogList />} />
          <Route path="/dogs/:id" element={<Dog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
