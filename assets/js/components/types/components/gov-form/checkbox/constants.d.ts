import { Sizes } from '../../../core/constants/sizes';
import { ValueOf } from '../../../types/interfaces';
export declare const FormCheckboxSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L">;
export type FormCheckboxSizesType = `${ValueOf<typeof FormCheckboxSizes>}`;
export declare const FormCheckboxClass: {
  root: string;
  check: string;
  label: string;
};
