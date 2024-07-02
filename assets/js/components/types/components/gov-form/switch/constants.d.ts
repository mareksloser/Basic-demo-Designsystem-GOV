import { Sizes } from '../../../core/constants/sizes';
import { ValueOf } from '../../../types/interfaces';
export declare const FormSwitchSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L">;
export type FormSwitchSizesType = `${ValueOf<typeof FormSwitchSizes>}`;
export declare const FormSwitchClass: {
  root: string;
  holder: string;
  input: string;
  indicator: string;
};
