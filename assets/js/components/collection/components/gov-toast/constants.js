import { Variants, Types } from "../../core/constants/variants";
import { pick } from "../../utils/utils";
export const ToastVariants = pick(Variants, ['SUCCESS', 'WARNING', 'ERROR', 'SECONDARY', 'PRIMARY']);
export const ToastTypes = pick(Types, ['CLASSIC', 'SOLID']);
export const ToastClass = {
  root: 'gov-toast',
  hidden: 'gov-toast--hidden',
  icon: 'gov-toast__icon',
  content: 'gov-toast__content',
  close: 'gov-toast__close',
  timer: 'gov-toast__timer',
};
//# sourceMappingURL=constants.js.map
