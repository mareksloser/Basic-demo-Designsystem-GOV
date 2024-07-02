import { Sizes } from '../../../core/constants/sizes';
import { Variants } from '../../../core/constants/variants';
import { ValueOf } from '../../../types/interfaces';
export declare const FormMultiselectSizes: Pick<typeof Sizes, "_M" | "_L" | "_XL">;
export type FormMultiselectSizesType = `${ValueOf<typeof FormMultiselectSizes>}`;
export declare const FormMultiselectVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type FormMultiselectVariantType = `${ValueOf<typeof FormMultiselectVariants>}`;
export declare const FormMultiSelectClass: {
  root: string;
  wrap: string;
  list: string;
  item: string;
};
