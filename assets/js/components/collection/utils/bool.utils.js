export function toBool(value) {
  if (typeof value === 'string') {
    return ['true', 'True', 'TRUE', '1'].indexOf(value) !== -1;
  }
  else if (typeof value === 'number') {
    return value > 0;
  }
  else if (typeof value === 'boolean') {
    return value;
  }
  else {
    return value ? true : false;
  }
}
//# sourceMappingURL=bool.utils.js.map
