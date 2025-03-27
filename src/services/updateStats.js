import fetchSinglePokemon from "./fetchSinglePokemon";
import fetchUserData from "./fetchUserData";

const JSON_SERVER_URL = "http://localhost:3000/users";

const updateStats = async (winnerPokemon, loserPokemon, loggedUserId) => {
  try {
    const { name: winnerName, url: winnerUrl } = winnerPokemon;
    const { name: loserName, url: loserUrl } = loserPokemon;
    const userData = await fetchUserData(JSON_SERVER_URL, loggedUserId);
    const oldStats = userData.stats;

    const winnerPokemonData = await fetchSinglePokemon(winnerUrl);
    const loserPokemonData = await fetchSinglePokemon(loserUrl);

    let newStats = {};

    if (winnerName in oldStats) {
      const newWinnerBaseExperience = oldStats[winnerName].baseExperience + 10;
      const newWins = oldStats[winnerName].wins + 1;
      const newLosses = oldStats[winnerName].losses;
      newStats = { ...oldStats };
      newStats[winnerName] = {
        wins: newWins,
        losses: newLosses,
        baseExperience: newWinnerBaseExperience,
      };
    } else {
      newStats = {
        ...oldStats,
        [winnerName]: {
          wins: 1,
          losses: 0,
          baseExperience: winnerPokemonData.baseExperience + 10,
        },
      };
    }

    if (loserName in oldStats) {
      const newWins = oldStats[loserName].wins;
      const newLosses = oldStats[loserName].losses + 1;

      newStats[loserName] = {
        wins: newWins,
        losses: newLosses,
        baseExperience: loserPokemonData.baseExperience,
      };
    } else {
      newStats = {
        ...newStats,
        [loserName]: {
          wins: 0,
          losses: 1,
          baseExperience: loserPokemonData.baseExperience,
        },
      };
    }

    const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
      method: "PATCH",
      body: JSON.stringify({
        stats: newStats,
      }),
    });
    if (!patchResponse) throw new Error("problem patching stats");
  } catch (e) {
    window.alert(e);
  }
};

export default updateStats;
