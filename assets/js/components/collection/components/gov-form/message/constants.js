import { Variants } from "../../../core/constants/variants";
import { pick } from "../../../utils/utils";
export const FormMessageVariants = pick(Variants, ['SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
export const FormMessageClass = {
  root: 'gov-form-message',
  content: 'gov-form-message__content',
  icon: 'gov-form-message__icon',
};
//# sourceMappingURL=constants.js.map
