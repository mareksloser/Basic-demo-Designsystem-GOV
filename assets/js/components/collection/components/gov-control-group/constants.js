import { Variants } from "../../core/constants/variants";
import { pick } from "../../utils/utils";
export const ControlGroupVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
export const ControlGroupClass = {
  root: 'gov-control-group',
};
//# sourceMappingURL=constants.js.map
