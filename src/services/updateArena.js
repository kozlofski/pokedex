import { JSON_SERVER_URL } from "../constants";

const updateArena = async (newArena, loggedUserId) => {
  const patchResponse = fetch(`${JSON_SERVER_URL}/${loggedUserId}`, {
    method: "PATCH",
    body: JSON.stringify({
      arena: newArena,
    }),
  });
  if (!patchResponse) throw new Error("Error patching arena");
};

export default updateArena;
