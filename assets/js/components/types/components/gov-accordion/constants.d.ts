import { Sizes } from '../../core/constants/sizes';
import { Variants } from '../../core/constants/variants';
import { ValueOf } from '../../types/interfaces';
export declare const AccordionSizes: Pick<typeof Sizes, "_XS" | "_S" | "_M" | "_L">;
export type AccordionSizeType = `${ValueOf<typeof AccordionSizes>}`;
export declare const AccordionVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "CUSTOM">;
export type AccordionVariantType = `${ValueOf<typeof AccordionVariants>}`;
export declare const AccordionClass: {
  root: string;
};
export declare const AccordionItemClass: {
  root: string;
  header: string;
  icon: string;
  title: string;
  label: string;
  annotation: string;
  suffix: string;
  right: string;
  arrow: string;
  content: string;
};
