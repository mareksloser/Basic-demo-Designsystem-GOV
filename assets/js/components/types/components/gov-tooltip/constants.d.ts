import { Variants } from '../../core/constants/variants';
import { Sizes } from '../../core/constants/sizes';
import { ValueOf } from '../../types/interfaces';
export declare const TooltipVariant: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type TooltipVariantType = `${ValueOf<typeof TooltipVariant>}`;
export declare const TooltipSize: Pick<typeof Sizes, "_S" | "_M" | "_L">;
export type TooltipSizeType = `${ValueOf<typeof TooltipSize>}`;
export declare enum TooltipPosition {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left"
}
export type TooltipPositionType = `${ValueOf<typeof TooltipPosition>}`;
export declare const TooltipClass: {
  root: string;
};
export declare const TooltipContentClass: {
  root: string;
};
