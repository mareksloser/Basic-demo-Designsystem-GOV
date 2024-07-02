import { Sizes } from '../../../core/constants/sizes';
import { ValueOf } from '../../../types/interfaces';
export declare const FormControlSizes: Pick<typeof Sizes, "_M" | "_L" | "_XL">;
export type FormControlSizesType = `${ValueOf<typeof FormControlSizes>}`;
export declare const FormControlClass: {
  root: string;
  holder: string;
  bottom: string;
};
