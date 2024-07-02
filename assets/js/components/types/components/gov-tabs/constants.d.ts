import { Variants } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const TabVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type VariantType = `${ValueOf<typeof TabVariants>}`;
export declare enum TabTypes {
  TEXT = "text",
  CHIP = "chip"
}
export type TabType = `${ValueOf<typeof TabTypes>}`;
export declare enum TabOrientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}
export type TabOrientationType = `${ValueOf<typeof TabOrientation>}`;
export declare const TabsClass: {
  root: string;
  tabs: string;
  list: string;
  item: string;
  btn: string;
};
export declare const TabsItemClass: {
  root: string;
  inner: string;
};
