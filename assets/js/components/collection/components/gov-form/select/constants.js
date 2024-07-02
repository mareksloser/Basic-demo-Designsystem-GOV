import { Sizes } from "../../../core/constants/sizes";
import { Variants } from "../../../core/constants/variants";
import { pick } from "../../../utils/utils";
export const FormSelectSizes = pick(Sizes, ['_M', '_L', '_XL']);
export const FormSelectVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
export const FormSelectClass = {
  root: 'gov-form-select',
  icon: 'gov-form-select__icon',
};
//# sourceMappingURL=constants.js.map
