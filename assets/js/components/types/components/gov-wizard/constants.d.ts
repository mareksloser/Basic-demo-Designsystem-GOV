import { Variants } from '../../core/constants/variants';
import { Sizes } from '../../core/constants/sizes';
import { ValueOf } from '../../types/interfaces';
export declare const WizardVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type WizardVariantsType = `${ValueOf<typeof WizardVariants>}`;
export declare const WizardSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M">;
export type WizardSizesType = `${ValueOf<typeof WizardSizes>}`;
export declare const WizardClass: {
  root: string;
};
export declare const WizardItemClass: {
  root: string;
  header: string;
  arrow: string;
  title: string;
  name: string;
  label: string;
  annot: string;
  prefix: string;
  content: string;
};
