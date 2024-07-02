export declare function format(first: string, middle: string, last: string): string;
export declare function delay(miliseconds: number): Promise<void>;
export declare function throttle(f: (entries: any) => void, delay: number): (...args: any[]) => void;
/**
 * Checks if object has that property
 *
 * @param {K} prop
 * @param {T} obj
 * @return {obj is T & Record<K, V>}
 */
export declare const has: <T extends object, K extends PropertyKey, V>(prop: K, obj: T) => obj is T & Record<K, V>;
/**
 * Returns property of given Object
 *
 * @param {K} name
 * @param {T} object
 * @return {(T & Record<K, unknown>)[K]}
 */
export declare const property: <T extends object, K extends keyof T>(name: K, object: T) => T[K];
export declare const pick: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: readonly K[]) => Pick<T, K>;
