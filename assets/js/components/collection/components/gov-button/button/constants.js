import { Sizes } from "../../../core/constants/sizes";
import { Variants } from "../../../core/constants/variants";
import { pick } from "../../../utils/utils";
export const ButtonSizes = pick(Sizes, ['_XS', '_S', '_M', '_L', '_XL']);
export const ButtonVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
export var Type;
(function (Type) {
  Type["SOLID"] = "solid";
  Type["OUTLINED"] = "outlined";
  Type["BASE"] = "base";
  Type["LINK"] = "link";
})(Type || (Type = {}));
export var NativeType;
(function (NativeType) {
  NativeType["SUBMIT"] = "submit";
  NativeType["BUTTON"] = "button";
  NativeType["RESET"] = "reset";
})(NativeType || (NativeType = {}));
export var ButtonTarget;
(function (ButtonTarget) {
  ButtonTarget["BLANK"] = "_blank";
  ButtonTarget["SELF"] = "_self";
  ButtonTarget["NEW"] = "_new";
})(ButtonTarget || (ButtonTarget = {}));
export const ButtonClass = {
  root: 'gov-button',
  rootWithIcon: 'gov-button--w-icon',
};
//# sourceMappingURL=constants.js.map
