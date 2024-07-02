export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type OptionalProperty<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type ObjectOrArrayType<T> = T | T[];
export declare const ObjectOrArray: {
  first: <T>(item: ObjectOrArrayType<T>) => T;
  array: <T_1>(item: ObjectOrArrayType<T_1>) => T_1[];
};
export declare const Omit: <T extends object, P extends keyof T, R extends Omit<T, P>>(properties: P[], object: T) => R;
export declare const whenDefined: <I, O>(fn: (input: I) => O) => (value?: I) => O;
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
export declare const compare: <T extends object>(properties: (keyof T)[]) => (a: T, b: T) => number;
export declare const is: <T>(value: T) => value is T;
export declare const has: <T extends object, P extends keyof T>(property: P) => (object: OptionalProperty<T, P>) => object is T;
export declare const equals: <A>(a?: A) => (b?: A) => boolean;
export declare const prop: <T, P extends keyof T>(property: P) => (object: T) => T[P];
export declare const propOptional: <T, P extends keyof T>(property: P) => (object?: T) => T[P];
export declare const hasOwnProperty: <X extends object, Y extends PropertyKey>(obj: X, prop: Y) => obj is X & Record<Y, ValueOf<X>>;
export declare const isObject: <T extends object>(obj: unknown) => obj is T;
export declare const isString: (input: unknown) => input is string;
export declare const isNumber: (input: unknown) => input is string;
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
export declare const getEntries: <T extends object>(obj: T) => Entries<T>;
export declare const getKeys: <T extends object>(obj: T) => (keyof T)[];
export declare const getValues: <T extends object>(obj: T) => ValueOf<T>[];
export declare const first: <T>(array: T[]) => T;
export declare const pairs: <T>(arr: T[]) => Array<[string, string]>;
export declare const find: <T, S extends T>(predicate: (item: T) => item is S) => (array?: T[]) => S;
export declare const filter: <T, S extends T>(predicate: (item: T) => item is S) => (array?: T[]) => S[];
export {};
