async function delay(miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}
function throttle(f, delay) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), delay);
  };
}
/**
 * Checks if object has that property
 *
 * @param {K} prop
 * @param {T} obj
 * @return {obj is T & Record<K, V>}
 */
const has = (prop, obj) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
/**
 * Returns property of given Object
 *
 * @param {K} name
 * @param {T} object
 * @return {(T & Record<K, unknown>)[K]}
 */
const property = (name, object) => {
  return has(name, object) ? object[name] : undefined;
};
const pick = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));

export { property as a, delay as d, has as h, pick as p, throttle as t };

//# sourceMappingURL=utils-c057a3fa.js.map