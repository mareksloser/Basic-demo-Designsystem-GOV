import { Sizes } from "../../../core/constants/sizes";
import { ValueOf } from "../../../types/interfaces";
export declare const FormGroupSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L" | "_2XS">;
export type FormGroupSizesType = `${ValueOf<typeof FormGroupSizes>}`;
export declare enum FormGroupOrientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}
export type FormGroupOrientationType = `${ValueOf<typeof FormGroupOrientation>}`;
export declare const FormGroupClass: {
  root: string;
};
