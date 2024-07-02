import { Sizes } from "../../../core/constants/sizes";
import { Variants } from "../../../core/constants/variants";
import { pick } from "../../../utils/utils";
export const FormMultiselectSizes = pick(Sizes, ['_M', '_L', '_XL']);
export const FormMultiselectVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
export const FormMultiSelectClass = {
  root: 'gov-form-multi-select',
  wrap: 'gov-form-multi-select__wrap',
  list: 'gov-form-multi-select__list',
  item: 'gov-form-multi-select__item',
};
//# sourceMappingURL=constants.js.map
