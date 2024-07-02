export const ObjectOrArray = {
  first: (item) => (Array.isArray(item) ? item[0] : item),
  array: (item) => (Array.isArray(item) ? item : [item]),
};
export const Omit = (properties, object) => Object.entries(object).reduce((all, [key, value]) => (properties.includes(key) ? all : Object.assign(Object.assign({}, all), { [key]: value })), {});
export const whenDefined = (fn) => (value) => value ? fn(value) : undefined;
/**
 * Comparator function which defines the sort order
 * @example
 * ```
 * // sorts objects by `id` property
 * [{ id: 3 }, { id: 2 }, { id: 1 }].sort(compare(['id']))
 *
 * // sorts objects by `id` and `name` properties
 * [{ id: 3, name: 'b' }, { id: 2, name: 'a' }, { id: 1, name: 'b' }].sort(compare(['id', 'name']))
 * ```
 *
 * @param {Array<keyof T>} properties
 * @return {number}
 */
export const compare = (properties) => (a, b) => {
  const [property, ...rest] = properties;
  if (!property) {
    return 0;
  }
  if (a[property] < b[property]) {
    return -1;
  }
  if (a[property] > b[property]) {
    return 1;
  }
  return rest.length > 0 ? compare(rest)(a, b) : 0;
};
export const is = (value) => value !== undefined && value !== null;
export const has = (property) => (object) => {
  return !!object[property];
};
export const equals = (a) => (b) => a === b;
export const prop = (property) => (object) => object[property];
export const propOptional = (property) => (object) => object ? object[property] : undefined;
export const hasOwnProperty = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
export const isObject = (obj) => typeof obj === 'object';
export const isString = (input) => is(input) && typeof input === 'string';
export const isNumber = (input) => is(input) && typeof input === 'number';
export const getEntries = (obj) => Object.entries(obj);
export const getKeys = (obj) => Object.keys(obj);
export const getValues = (obj) => Object.values(obj);
export const first = (array) => array[0];
export const pairs = (arr) => arr.flatMap((item1, index1) => arr.flatMap((item2, index2) => (index1 > index2 ? [[item1, item2]] : [])));
export const find = (predicate) => (array) => (array || []).find(predicate);
export const filter = (predicate) => (array) => (array || []).filter(predicate);
//# sourceMappingURL=helpers.types.js.map
