import { Variants, Types } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const ToastVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type ToastVariantType = `${ValueOf<typeof ToastVariants>}`;
export declare const ToastTypes: Pick<typeof Types, "SOLID" | "CLASSIC">;
export type ToastTypesType = `${ValueOf<typeof ToastTypes>}`;
export declare const ToastClass: {
  root: string;
  hidden: string;
  icon: string;
  content: string;
  close: string;
  timer: string;
};
