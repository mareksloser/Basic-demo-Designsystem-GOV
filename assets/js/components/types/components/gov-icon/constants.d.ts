import { ValueOf } from '../../types/interfaces';
declare enum Types {
  BASIC = "basic",
  COMPLEX = "complex",
  COLORED = "colored"
}
export type Type = `${ValueOf<typeof Types>}`;
export declare const IconClass: {
  root: string;
  holder: string;
};
export {};
