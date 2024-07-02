'use strict';

const sizes = require('./sizes-79872c2a.js');
const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');

const ButtonSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M', '_L', '_XL']);
const ButtonVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
exports.Type = void 0;
(function (Type) {
  Type["SOLID"] = "solid";
  Type["OUTLINED"] = "outlined";
  Type["BASE"] = "base";
  Type["LINK"] = "link";
})(exports.Type || (exports.Type = {}));
exports.NativeType = void 0;
(function (NativeType) {
  NativeType["SUBMIT"] = "submit";
  NativeType["BUTTON"] = "button";
  NativeType["RESET"] = "reset";
})(exports.NativeType || (exports.NativeType = {}));
var ButtonTarget;
(function (ButtonTarget) {
  ButtonTarget["BLANK"] = "_blank";
  ButtonTarget["SELF"] = "_self";
  ButtonTarget["NEW"] = "_new";
})(ButtonTarget || (ButtonTarget = {}));
const ButtonClass = {
  root: 'gov-button',
  rootWithIcon: 'gov-button--w-icon',
};

exports.ButtonClass = ButtonClass;
exports.ButtonSizes = ButtonSizes;
exports.ButtonVariants = ButtonVariants;

//# sourceMappingURL=constants-a31344ad.js.map