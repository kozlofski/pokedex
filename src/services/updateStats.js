import fetchUserData from "./fetchUserData";
import { JSON_SERVER_URL } from "../constants";

const updateStats = async (winnerPokemon, loserPokemon, loggedUserId) => {
  try {
    const userData = await fetchUserData(loggedUserId);
    const oldStats = userData.stats;

    let newStats = {};

    if (winnerPokemon.name in oldStats) {
      const newWinnerBaseExperience =
        oldStats[winnerPokemon.name].baseExperience + 10;
      const newWins = oldStats[winnerPokemon.name].wins + 1;
      const newLosses = oldStats[winnerPokemon.name].losses;
      newStats = { ...oldStats };
      newStats[winnerPokemon.name] = {
        wins: newWins,
        losses: newLosses,
        baseExperience: newWinnerBaseExperience,
      };
    } else {
      newStats = {
        ...oldStats,
        [winnerPokemon.name]: {
          wins: 1,
          losses: 0,
          baseExperience: winnerPokemon.baseExperience + 10,
        },
      };
    }

    if (loserPokemon.name in oldStats) {
      const newWins = oldStats[loserPokemon.name].wins;
      const newLosses = oldStats[loserPokemon.name].losses + 1;

      newStats[loserPokemon.name] = {
        wins: newWins,
        losses: newLosses,
        baseExperience: loserPokemon.baseExperience,
      };
    } else {
      newStats = {
        ...newStats,
        [loserPokemon.name]: {
          wins: 0,
          losses: 1,
          baseExperience: loserPokemon.baseExperience,
        },
      };
    }

    const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stats: newStats,
      }),
    });
    if (!patchResponse) throw new Error("Error during patching stats: ");
  } catch (error) {
    console.error(error);
  }
};

export default updateStats;
