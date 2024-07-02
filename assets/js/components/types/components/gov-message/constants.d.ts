import { Variants } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const MessageVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type MessageVariantType = `${ValueOf<typeof MessageVariants>}`;
export declare const MessageClass: {
  root: string;
  icon: string;
  content: string;
  close: string;
};
