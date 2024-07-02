import { Variants } from '../../core/constants/variants';
import { Sizes } from '../../core/constants/sizes';
import { ValueOf } from '../../types/interfaces';
export declare const StepperVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type StepperVariantType = `${ValueOf<typeof StepperVariants>}`;
export declare const StepperSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M">;
export type StepperSizesType = `${ValueOf<typeof StepperSizes>}`;
export declare const StepperClass: {
  root: string;
};
export declare const StepperItemClass: {
  root: string;
  rootWithAnnot: string;
  header: string;
  title: string;
  label: string;
  name: string;
  annot: string;
  prefix: string;
  content: string;
  suffix: string;
};
