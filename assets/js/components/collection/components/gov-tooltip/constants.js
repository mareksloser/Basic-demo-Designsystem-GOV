import { Variants } from "../../core/constants/variants";
import { Sizes } from "../../core/constants/sizes";
import { pick } from "../../utils/utils";
export const TooltipVariant = pick(Variants, ['PRIMARY', 'SECONDARY']);
export const TooltipSize = pick(Sizes, ['_S', '_M', '_L']);
export var TooltipPosition;
(function (TooltipPosition) {
  TooltipPosition["TOP"] = "top";
  TooltipPosition["RIGHT"] = "right";
  TooltipPosition["BOTTOM"] = "bottom";
  TooltipPosition["LEFT"] = "left";
})(TooltipPosition || (TooltipPosition = {}));
export const TooltipClass = {
  root: 'gov-tooltip',
};
export const TooltipContentClass = {
  root: 'gov-tooltip-content',
};
//# sourceMappingURL=constants.js.map
