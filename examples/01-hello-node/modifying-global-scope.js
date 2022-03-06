let count = 0;

// Modifying global scope
// Please refrain from doing this since it mutates the global state and
// breaks encapsulation!
global.ourGlobalFunction = (source) => {
  count++;
  console.log(`Call count: ${count} (from ${source})`);
};
