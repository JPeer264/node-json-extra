const isJson = (json) => (
  Object.prototype.toString.call(json) === '[object Object]'
);

export default isJson;
