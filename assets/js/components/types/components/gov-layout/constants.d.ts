import { ValueOf } from '../../types/interfaces';
export declare const LayoutClass: {
  root: string;
  section: string;
};
declare enum LayoutTypes {
  STRETCH = "stretch",
  ASIDE = "aside",
  TEXT = "text"
}
export type LayoutType = `${ValueOf<typeof LayoutTypes>}`;
declare enum LayoutVariant {
  LEFT = "left",
  RIGHT = "right"
}
export type LayoutVariantType = `${ValueOf<typeof LayoutVariant>}`;
export declare const LayoutColumnClass: {
  root: string;
};
export {};
