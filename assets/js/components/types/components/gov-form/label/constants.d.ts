import { Sizes } from "../../../core/constants/sizes";
import { ValueOf } from "../../../types/interfaces";
export declare const FormLabelSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L" | "_XL">;
export type FormLabelSizesTypes = `${ValueOf<typeof FormLabelSizes>}`;
export declare const FormLabelClass: {
  root: string;
  label: string;
};
