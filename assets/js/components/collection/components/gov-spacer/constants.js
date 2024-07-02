import { Sizes } from "../../core/constants/sizes";
import { pick } from "../../utils/utils";
export const SpacerSize = pick(Sizes, ['_2XS', '_XS', '_S', '_M', '_L', '_XL', '_2XL', '_3XL', '_4XL']);
export var SpacerBreakpoints;
(function (SpacerBreakpoints) {
  SpacerBreakpoints["NONE"] = "none";
  SpacerBreakpoints["SM"] = "sm";
  SpacerBreakpoints["MD"] = "md";
  SpacerBreakpoints["LG"] = "lg";
  SpacerBreakpoints["XL"] = "xl";
})(SpacerBreakpoints || (SpacerBreakpoints = {}));
export const SpacerClass = {
  root: 'gov-spacer',
};
//# sourceMappingURL=constants.js.map
