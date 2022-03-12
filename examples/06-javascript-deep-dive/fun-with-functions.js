// Dipping our toes into functional programming

///////////////////////////////////////////////////////
// Implementing our own map function: applyToElements
///////////////////////////////////////////////////////
const applyToElements = (operation, list) => {
  let results = [];
  for (element of list) {
    results.push(operation(element));
  }
  return results;
};

// Since we will apply an operation to each element in
// the list we need our operations to take only 1 argument.
// We can do that by turning a multi-argument function into
// higher-order functions that only take one argument and
// returns a function that takes the next argument:
const add = (x) => (y) => x + y;
const subtract = (x) => (y) => x - y;
// The above are the same as if we would do:
function multiply(x) {
  return function (y) {
    return x * y;
  };
}

// Now we can "configure" our operation according to our needs.
// Let's create an operation that takes 1 argument and adds 5 to it:
const addFive = add(5);

// Now this function can be readily used in our applyToElements function:
result = applyToElements(addFive, [1, 2, 3, 4]);
console.log("🐙 applyToElements(addFive, [1, 2, 3, 4]) ->", result);

///////////////////////////////////////////////////////
// Implementing our own filter function: keepIf
///////////////////////////////////////////////////////
const keepIf = (predicate, list) => {
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

result = keepIf(isEven, [1, 2, 3, 4]);
console.log("🐙 keepIf(isEven, [1, 2, 3, 4]) ->", result);

///////////////////////////////////////////////////////
// Implementing our own reduce function I: generalizedApplyToElements
///////////////////////////////////////////////////////

// You might have noticed that there are some code duplication
// between applyToElements and keepIf. Let's try and generalize
// what we are doing and extract the common bits into another
// function: generalizedApplyToElements.
const generalizedApplyToElements = (operation, list) => {
  let results = [];
  for (element of list) {
    // Since we don't know what the operation will do to the
    // accumulated results list (append or not append), we need
    // to be able to pass it to the operation function:
    results = operation(results, element);
  }
  return results;
};

// generalizedApplyToElements is now able to handle both mapping
// and filtering at the expense of the operation function becoming
// more specific.
result = generalizedApplyToElements(
  (results, x) => {
    return [...results, x + 5];
  },
  [1, 2, 3, 4]
);
console.log(
  `🐙 generalizedApplyToElements((results, x) => {
  return [...results, x + 5]
}, [1, 2, 3, 4]) ->`,
  result
);

result = generalizedApplyToElements(
  (results, x) => {
    if (isEven(x)) {
      return [...results, x];
    }

    return results;
  },
  [1, 2, 3, 4]
);
console.log(
  `🐙 generalizedApplyToElements((results, x) => {
  if (isEven(x)) {
    return [...results, x];
  }

  return results;
}, [1, 2, 3, 4]) ->`,
  result
);

///////////////////////////////////////////////////////
// Implementing our own reduce function II: theOneToRuleThemAll
///////////////////////////////////////////////////////

// We can go further though, by allowing the caller to pass in
// the accumulator (results) we can actually handle even more
// use-cases.
const theOneToRuleThemAll = (operation, list, accumulator) => {
  for (element of list) {
    accumulator = operation(accumulator, element);
  }
  return accumulator;
};

// We can for instance sum all the numbers in a list
result = theOneToRuleThemAll((sum, x) => sum + x, [1, 2, 3, 4], 0);
console.log(
  "🐙 theOneToRuleThemAll((sum, x) => sum + x, [1, 2, 3, 4], 0) ->",
  result
);

// Or build an object from a list
const dogs = [
  { name: "Fido", breed: "Chihuahua" },
  { name: "Woofmeister", breed: "Poodle" },
  { name: "Puglifer", breed: "Pug" },
  { name: "Poddle McPoodleface", breed: "Poodle" },
];
result = theOneToRuleThemAll(
  (accumulator, dog) => ({
    ...accumulator,
    [dog.breed]: (accumulator[dog.breed] || 0) + 1,
  }),
  dogs,
  {}
);
console.log(
  `🐙 result = theOneToRuleThemAll(
  (accumulator, dog) => ({
    ...accumulator,
    [dog.breed]: (accumulator[dog.breed] || 0) + 1,
  }),
  dogs,
  {}
) ->`,
  result
);

// Now we have implemented almost a full version of the JavaScript reduce
// array method [].reduce. I hope this illustrates the power of the concept
// of higher-order functions. Higher-order functions together with referential
// transparency (the fact that a function should always return the same result
// when passed the same arguments) are at the heart of functional programming
// and grasping the potential of them allows for very powerful abstractions.
