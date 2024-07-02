import { Sizes } from '../../../core/constants/sizes';
import { Variants } from '../../../core/constants/variants';
import { ValueOf } from '../../../types/interfaces';
export declare const FormSelectSizes: Pick<typeof Sizes, "_M" | "_L" | "_XL">;
export type FormSelectSizesType = `${ValueOf<typeof FormSelectSizes>}`;
export declare const FormSelectVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type FormSelectVariantType = `${ValueOf<typeof FormSelectVariants>}`;
export declare const FormSelectClass: {
  root: string;
  icon: string;
};
