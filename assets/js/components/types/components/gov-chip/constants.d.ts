import { ValueOf } from '../../types/interfaces';
export declare enum NativeType {
  A = "a",
  SPAN = "span",
  BUTTON = "button"
}
export type NativeTypesType = `${ValueOf<typeof NativeType>}`;
export declare const ChipClass: {
  root: string;
  inner: string;
  hasRight: string;
  hasLeft: string;
};
