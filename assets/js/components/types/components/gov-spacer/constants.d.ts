import { Sizes } from '../../core/constants/sizes';
import { ValueOf } from '../../types/interfaces';
export declare const SpacerSize: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L" | "_2XS" | "_XL" | "_2XL" | "_3XL" | "_4XL">;
export type SpacerSizeType = `${ValueOf<typeof SpacerSize>}`;
export declare enum SpacerBreakpoints {
  NONE = "none",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl"
}
export type SpacerBreakpointsType = `${ValueOf<typeof SpacerBreakpoints>}`;
export declare const SpacerClass: {
  root: string;
};
