import { JSON_SERVER_URL } from "../constants";

const updateFavourites = (newFavourites, loggedUserId) => {
  const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favourites: newFavourites,
    }),
  });
  if (!patchResponse) throw new Error("Error patching favourites list");
};

export default updateFavourites;
