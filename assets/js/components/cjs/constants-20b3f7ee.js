'use strict';

const variants = require('./variants-f5ffeef3.js');
const sizes = require('./sizes-79872c2a.js');
const utils = require('./utils-c9b1bba3.js');

const TooltipVariant = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
const TooltipSize = utils.pick(sizes.Sizes, ['_S', '_M', '_L']);
exports.TooltipPosition = void 0;
(function (TooltipPosition) {
  TooltipPosition["TOP"] = "top";
  TooltipPosition["RIGHT"] = "right";
  TooltipPosition["BOTTOM"] = "bottom";
  TooltipPosition["LEFT"] = "left";
})(exports.TooltipPosition || (exports.TooltipPosition = {}));
const TooltipClass = {
  root: 'gov-tooltip',
};
const TooltipContentClass = {
  root: 'gov-tooltip-content',
};

exports.TooltipClass = TooltipClass;
exports.TooltipContentClass = TooltipContentClass;
exports.TooltipSize = TooltipSize;
exports.TooltipVariant = TooltipVariant;

//# sourceMappingURL=constants-20b3f7ee.js.map