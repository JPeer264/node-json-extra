/**
 * check if a json file is valid
 *
 * @param {String} json
 *
 * @return {Boolean}
 */
function check(type, json) {
  let thisType = type;
  let thisJson = json;

  if (!thisJson) {
    thisJson = thisType;
    thisType = 'string';
  }

  if (thisType === 'string') {
    try {
      JSON.parse(thisJson);
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line
  return typeof thisJson === thisType;
}

module.exports = check;
