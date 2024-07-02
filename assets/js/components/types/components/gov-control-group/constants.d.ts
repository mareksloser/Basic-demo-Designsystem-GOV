import { Variants } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const ControlGroupVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type ControlGroupVariantType = `${ValueOf<typeof ControlGroupVariants>}`;
export declare const ControlGroupClass: {
  root: string;
};
