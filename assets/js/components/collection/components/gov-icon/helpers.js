export const prepareIconFormat = (value) => {
  if (typeof value === 'string' && value.length) {
    const regexPattern = /^[a-z-]+\/[a-z-]+$/;
    if (regexPattern.test(value)) {
      const icon = value.split("/");
      return {
        type: icon[0],
        name: icon[1],
      };
    }
  }
  return null;
};
//# sourceMappingURL=helpers.js.map
