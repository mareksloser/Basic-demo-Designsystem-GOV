import { Sizes } from '../../../core/constants/sizes';
import { Variants } from '../../../core/constants/variants';
import { ValueOf } from '../../../types/interfaces';
export declare const ButtonSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L" | "_XL">;
export type ButtonSizesType = `${ValueOf<typeof ButtonSizes>}`;
export declare const ButtonVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type ButtonVariantType = `${ValueOf<typeof ButtonVariants>}`;
export declare enum Type {
  SOLID = "solid",
  OUTLINED = "outlined",
  BASE = "base",
  LINK = "link"
}
export type TypesType = `${ValueOf<typeof Type>}`;
export declare enum NativeType {
  SUBMIT = "submit",
  BUTTON = "button",
  RESET = "reset"
}
export type NativeTypesType = `${ValueOf<typeof NativeType>}`;
export declare enum ButtonTarget {
  BLANK = "_blank",
  SELF = "_self",
  NEW = "_new"
}
export type ButtonTargetType = `${ValueOf<typeof ButtonTarget>}`;
export declare const ButtonClass: {
  root: string;
  rootWithIcon: string;
};
