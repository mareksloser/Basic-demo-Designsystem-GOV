import { Sizes } from "../../../core/constants/sizes";
import { Variants } from "../../../core/constants/variants";
import { pick } from "../../../utils/utils";
export const FormInputSizes = pick(Sizes, ['_S', '_M', '_L', '_XL']);
export const FormInputVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
export var InputTypes;
(function (InputTypes) {
  InputTypes["COLOR"] = "color";
  InputTypes["DATE"] = "date";
  InputTypes["DATETIME_LOCAL"] = "datetime-local";
  InputTypes["EMAIL"] = "email";
  InputTypes["MONTH"] = "month";
  InputTypes["NUMBER"] = "number";
  InputTypes["PASSWORD"] = "password";
  InputTypes["SEARCH"] = "search";
  InputTypes["TEL"] = "tel";
  InputTypes["TEXT"] = "text";
  InputTypes["TIME"] = "time";
  InputTypes["URL"] = "url";
  InputTypes["WEEK"] = "week";
})(InputTypes || (InputTypes = {}));
export var Type;
(function (Type) {
  Type["RESET"] = "reset";
})(Type || (Type = {}));
export const FormInputClass = {
  root: 'gov-form-input',
};
//# sourceMappingURL=constants.js.map
