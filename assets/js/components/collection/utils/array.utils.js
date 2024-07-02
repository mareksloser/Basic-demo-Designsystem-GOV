export const createArrayRange = (from, to) => {
  if (Number.isInteger(from) && Number.isInteger(to)) {
    return [...Array(to + 1).keys()].slice(from);
  }
  return [];
};
//# sourceMappingURL=array.utils.js.map
