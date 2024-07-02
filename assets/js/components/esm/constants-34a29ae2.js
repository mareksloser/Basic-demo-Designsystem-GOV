import { S as Sizes } from './sizes-6c5943b4.js';
import { V as Variants } from './variants-2b936d58.js';
import { p as pick } from './utils-c057a3fa.js';

const ButtonSizes = pick(Sizes, ['_XS', '_S', '_M', '_L', '_XL']);
const ButtonVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
var Type;
(function (Type) {
  Type["SOLID"] = "solid";
  Type["OUTLINED"] = "outlined";
  Type["BASE"] = "base";
  Type["LINK"] = "link";
})(Type || (Type = {}));
var NativeType;
(function (NativeType) {
  NativeType["SUBMIT"] = "submit";
  NativeType["BUTTON"] = "button";
  NativeType["RESET"] = "reset";
})(NativeType || (NativeType = {}));
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

export { ButtonClass as B, NativeType as N, Type as T, ButtonSizes as a, ButtonVariants as b };

//# sourceMappingURL=constants-34a29ae2.js.map