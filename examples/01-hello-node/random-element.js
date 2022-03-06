export default function randomElement(xs) {
  const randomIndex = Math.floor((Math.random() * 10) % xs.length);

  ourGlobalFunction(import.meta.url);

  return xs[randomIndex];
}

// Why doesn't the call below work?
// ourGlobalFunction(import.meta.url);
