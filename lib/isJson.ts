// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isJson = (json: any): boolean => (
  Object.prototype.toString.call(json) === '[object Object]'
);

export default isJson;
