import { pick } from "../../../utils/utils";
import { Sizes } from "../../../core/constants/sizes";
export const FormGroupSizes = pick(Sizes, ['_2XS', '_XS', '_S', '_M', '_L']);
export var FormGroupOrientation;
(function (FormGroupOrientation) {
  FormGroupOrientation["HORIZONTAL"] = "horizontal";
  FormGroupOrientation["VERTICAL"] = "vertical";
})(FormGroupOrientation || (FormGroupOrientation = {}));
export const FormGroupClass = {
  root: 'gov-form-group',
};
//# sourceMappingURL=constants.js.map
