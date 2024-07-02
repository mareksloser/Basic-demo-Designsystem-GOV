import { V as Variants } from './variants-2b936d58.js';
import { S as Sizes } from './sizes-6c5943b4.js';
import { p as pick } from './utils-c057a3fa.js';

const TooltipVariant = pick(Variants, ['PRIMARY', 'SECONDARY']);
const TooltipSize = pick(Sizes, ['_S', '_M', '_L']);
var TooltipPosition;
(function (TooltipPosition) {
  TooltipPosition["TOP"] = "top";
  TooltipPosition["RIGHT"] = "right";
  TooltipPosition["BOTTOM"] = "bottom";
  TooltipPosition["LEFT"] = "left";
})(TooltipPosition || (TooltipPosition = {}));
const TooltipClass = {
  root: 'gov-tooltip',
};
const TooltipContentClass = {
  root: 'gov-tooltip-content',
};

export { TooltipVariant as T, TooltipSize as a, TooltipContentClass as b, TooltipPosition as c, TooltipClass as d };

//# sourceMappingURL=constants-887c5391.js.map