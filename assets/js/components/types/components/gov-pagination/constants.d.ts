import { Sizes } from '../../core/constants/sizes';
import { Variants } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const PaginationSizes: Pick<typeof Sizes, "_S" | "_M">;
export type PaginationSizeType = `${ValueOf<typeof PaginationSizes>}`;
export declare const PaginationVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY">;
export type PaginationVariantType = `${ValueOf<typeof PaginationVariants>}`;
export declare enum PaginationTypes {
  BUTTON = "button",
  SELECT = "select"
}
export type PaginationType = `${ValueOf<typeof PaginationTypes>}`;
export declare const PaginationClass: {
  root: string;
  list: string;
  item: string;
  itemArrow: string;
  itemMore: string;
  itemSelect: string;
  inner: string;
  arrow: string;
};
