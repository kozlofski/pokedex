const fight = (leftPokemon, rightPokemon) => {
  console.log("Fight: ", leftPokemon, rightPokemon);
  const { baseExperience: leftExp, weight: leftWeight } = leftPokemon;
  const { baseExperience: rightExp, weight: rightWeight } = rightPokemon;

  const leftPower = leftExp * leftWeight;
  const rightPower = rightExp * rightWeight;
  // can it be simplified?
  const winner = leftPower > rightPower ? leftPokemon : rightPokemon;
  const loser = leftPower > rightPower ? rightPokemon : leftPokemon;

  return { winner, loser };
};

export default fight;
