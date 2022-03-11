import cs from "classnames";
import "./styles.css";

const DogListItem = ({ dog, isSelected, selectDog }) => (
  <li
    key={dog._id}
    className={cs("dog-list-item", {
      "dog-list-item--selected": isSelected,
    })}
    onClick={selectDog}
  >
    <img className="dog-list-item__logo" src={dog.url} />
    <span className="dog-list-item__title">{dog.title}</span>
  </li>
);

export const DogList = ({ dogs, selectedDog, onSelectDog }) => (
  <ul className="dog-list">
    {dogs.map((dog) => (
      <DogListItem
        key={dog._id}
        dog={dog}
        isSelected={selectedDog && dog._id === selectedDog._id}
        selectDog={() => onSelectDog(dog)}
      />
    ))}
  </ul>
);
