// import fetchSinglePokemon from "./fetchSinglePokemon";

const fight = (leftPokemon, rightPokemon) => {
  console.log("Fight: ", leftPokemon, rightPokemon);
  const {
    // name: leftName,
    baseExperience: leftExp,
    weight: leftWeight,
  } = leftPokemon;
  const {
    // name: rightName,
    baseExperience: rightExp,
    weight: rightWeight,
  } = rightPokemon;

  const leftPower = leftExp * leftWeight;
  const rightPower = rightExp * rightWeight;
  console.log("powers: ", leftPower, rightPower);
  // can it be simplified?
  const winner = leftPower > rightPower ? leftPokemon : rightPokemon;
  const loser = leftPower > rightPower ? rightPokemon : leftPokemon;
  console.log("winner, loser: ", winner, loser);

  return { winner, loser };
};

export default fight;
