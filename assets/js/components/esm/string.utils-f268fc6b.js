function chr4() {
  return Math.random().toString(16).slice(-4);
}
function createID(prefix) {
  return `${prefix}-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
}
function removeDiacritics(string) {
  if (typeof string !== 'string')
    return string;
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function splitByWhitespace(string) {
  if (typeof string !== 'string')
    return string;
  return string.split(/(\s+)/);
}

export { createID as c, removeDiacritics as r, splitByWhitespace as s };

//# sourceMappingURL=string.utils-f268fc6b.js.map