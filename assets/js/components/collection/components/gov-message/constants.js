import { Variants } from "../../core/constants/variants";
import { pick } from "../../utils/utils";
export const MessageVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
export const MessageClass = {
  root: 'gov-message',
  icon: 'gov-message__icon',
  content: 'gov-message__content',
  close: 'gov-message__close',
};
//# sourceMappingURL=constants.js.map
