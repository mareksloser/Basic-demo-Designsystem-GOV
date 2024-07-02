import { ValueOf } from '../../types/interfaces';
import { Variants } from '../../core/constants/variants';
export declare enum StatsBarIconPosition {
  LEFT = "left"
}
export type StatsBarIconPositionType = `${ValueOf<typeof StatsBarIconPosition>}`;
export declare const StatsBarVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type StatsBarVariantType = `${ValueOf<typeof StatsBarVariants>}`;
export declare const StatsBarClass: {
  root: string;
  section: string;
};
export declare const StatsBarItemClass: {
  root: string;
  icon: string;
  number: string;
  text: string;
};
