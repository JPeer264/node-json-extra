export const isJsonString = (json) => {
  try {
    JSON.parse(json);

    return true;
  } catch (e) {
    return false;
  }
};
