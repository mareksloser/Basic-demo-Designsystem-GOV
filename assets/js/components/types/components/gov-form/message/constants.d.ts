import { Variants } from '../../../core/constants/variants';
import { ValueOf } from '../../../types/interfaces';
export declare const FormMessageVariants: Pick<typeof Variants, "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type FormMessageVariantType = `${ValueOf<typeof FormMessageVariants>}`;
export declare const FormMessageClass: {
  root: string;
  content: string;
  icon: string;
};
