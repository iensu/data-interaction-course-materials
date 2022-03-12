// Dipping our toes into functional programming

///////////////////////////////////////////////////////
// Implementing our own map function
///////////////////////////////////////////////////////
const map = (operation, list) => {
  let results = [];
  for (element of list) {
    results.push(operation(element));
  }
  return results;
};

function add(x) {
  return function (y) {
    return x * y;
  };
}
// The above are the same as if we would do:
const subtract = (x) => (y) => x - y;

// Now we can "configure" our operation according to our needs.
// Let's create an operation that takes 1 argument and adds 5 to it:
const addFive = add(5);

// Now this function can be readily used in our map function:
result = map(addFive, [1, 2, 3, 4]);
console.log("🐙 map(addFive, [1, 2, 3, 4]) ->", result);

///////////////////////////////////////////////////////
// Implementing our own filter function
///////////////////////////////////////////////////////
const filter = (predicate, list) => {
  let results = [];
  for (element of list) {
    if (predicate(element)) {
      results.push(element);
    }
  }
  return results;
};

// Here is our predicate function, a function that takes one argument and returns true or false.
const isEven = (x) => x % 2 == 0;

result = filter(isEven, [1, 2, 3, 4]);
console.log("🐙 filter(isEven, [1, 2, 3, 4]) ->", result);

///////////////////////////////////////////////////////
// Implementing reduceList
///////////////////////////////////////////////////////

// You might have noticed that there are some code duplication
// between map and filter. Let's try and generalize
// what we are doing and extract the common bits into another
// function: reduceList.
const reduceList = (operation, list) => {
  let results = [];
  for (element of list) {
    // Since we don't know what the operation will do to the
    // accumulated results list (append or not append), we need
    // to be able to pass it to the operation function:
    results = operation(results, element);
  }
  return results;
};

// reduceList is now able to handle both mapping
// and filtering at the expense of the operation function becoming
// more specific.
result = reduceList(
  (results, x) => {
    return [...results, x + 5];
  },
  [1, 2, 3, 4]
);
console.log(
  `🐙 reduceList((results, x) => {
  return [...results, x + 5]
}, [1, 2, 3, 4]) ->`,
  result
);

result = reduceList(
  (results, x) => {
    if (isEven(x)) {
      return [...results, x];
    }

    return results;
  },
  [1, 2, 3, 4]
);
console.log(
  `🐙 reduceList((results, x) => {
  if (isEven(x)) {
    return [...results, x];
  }

  return results;
}, [1, 2, 3, 4]) ->`,
  result
);

///////////////////////////////////////////////////////
// Implementing our own reduce
///////////////////////////////////////////////////////

const reduce = (operation, list, accumulator) => {
  for (element of list) {
    accumulator = operation(accumulator, element);
  }
  return accumulator;
};

// We can for instance sum all the numbers in a list
result = reduce((sum, x) => sum + x, [1, 2, 3, 4], 0);
console.log("🐙 reduce((sum, x) => sum + x, [1, 2, 3, 4], 0) ->", result);

// Or build an object from a list
const dogs = [
  { name: "Fido", breed: "Chihuahua" },
  { name: "Woofmeister", breed: "Poodle" },
  { name: "Puglifer", breed: "Pug" },
  { name: "Poddle McPoodleface", breed: "Poodle" },
];
result = reduce(
  (accumulator, dog) => ({
    ...accumulator,
    [dog.breed]: (accumulator[dog.breed] || 0) + 1,
  }),
  dogs,
  {}
);
console.log(
  `🐙 result = reduce(
  (accumulator, dog) => ({
    ...accumulator,
    [dog.breed]: (accumulator[dog.breed] || 0) + 1,
  }),
  dogs,
  {}
) ->`,
  result
);
