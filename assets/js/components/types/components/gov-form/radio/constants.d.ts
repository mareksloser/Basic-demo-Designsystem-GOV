import { Sizes } from '../../../core/constants/sizes';
import { ValueOf } from '../../../types/interfaces';
export declare const FormRadioSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L">;
export type FormRadioSizesType = `${ValueOf<typeof FormRadioSizes>}`;
export declare const FormRadioClass: {
  root: string;
  holder: string;
  input: string;
  indicator: string;
  label: string;
};
