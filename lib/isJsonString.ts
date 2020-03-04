// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJsonString = (json: any): boolean => {
  try {
    JSON.parse(json);

    return true;
  } catch (e) {
    return false;
  }
};

export default isJsonString;
