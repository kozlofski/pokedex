import fetchSinglePokemon from "./fetchSinglePokemon";

const fight = async (leftPokemon, rightPokemon) => {
  console.log("Fight: ", leftPokemon, rightPokemon);
  const {
    // name: leftName,
    baseExperience: leftExp,
    weight: leftWeight,
  } = await fetchSinglePokemon(leftPokemon.url);
  const {
    // name: rightName,
    baseExperience: rightExp,
    weight: rightWeight,
  } = await fetchSinglePokemon(rightPokemon.url);

  const leftPower = leftExp * leftWeight;
  const rightPower = rightExp * rightWeight;
  const winner = leftPower > rightPower ? leftPokemon : rightPokemon;
  const loser = leftPower > rightPower ? rightPokemon : leftPokemon;

  return { winner, loser };
};

export default fight;
