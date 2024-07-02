import { ValueOf } from "../../../types/interfaces";
export declare enum Position {
  LEFT = "left",
  RIGHT = "right"
}
export type PositionType = `${ValueOf<typeof Position>}`;
export declare const DropdownClass: {
  root: string;
  list: string;
};
