import { Variants } from '../../../core/constants/variants';
import { ValueOf } from '../../../types/interfaces';
export declare const FormSearchs: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type FormSearchVariantType = `${ValueOf<typeof FormSearchs>}`;
export declare const FormSearchClass: {
  root: string;
  input: string;
  button: string;
};
