import { Variants } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const InfobarVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type VariantType = `${ValueOf<typeof InfobarVariants>}`;
export declare const InfobarClass: {
  root: string;
  section: string;
  icon: string;
  content: string;
  closable: string;
  headline: string;
  close: string;
};
