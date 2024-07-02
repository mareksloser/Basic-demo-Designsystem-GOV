import { Sizes } from '../../../core/constants/sizes';
import { Variants } from '../../../core/constants/variants';
import { ValueOf } from '../../../types/interfaces';
export declare const FormAutocompleteSizes: Pick<typeof Sizes, "_M" | "_L" | "_XL">;
export type SizesType = `${ValueOf<typeof FormAutocompleteSizes>}`;
export declare const FormAutocompleteVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type VariantType = `${ValueOf<typeof FormAutocompleteVariants>}`;
export declare const FormAutocompleteClass: {
  root: string;
  list: string;
  item: string;
  empty: string;
  loading: string;
};
