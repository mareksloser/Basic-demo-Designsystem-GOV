import { Variants } from "../../core/constants/variants";
import { pick } from "../../utils/utils";
export const InfobarVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
export const InfobarClass = {
  root: 'gov-infobar',
  section: 'gov-infobar__section',
  icon: 'gov-infobar__icon',
  content: 'gov-infobar__content',
  closable: 'gov-infobar__content--closable',
  headline: 'gov-infobar__headline',
  close: 'gov-infobar__close',
};
//# sourceMappingURL=constants.js.map
