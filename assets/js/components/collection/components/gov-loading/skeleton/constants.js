import { pick } from "../../../utils/utils";
import { Variants } from "../../../core/constants/variants";
export const SkeletonVariants = pick(Variants, ["PRIMARY", "SECONDARY", "SUCCESS", "ERROR", "WARNING"]);
export var SkeletonShapes;
(function (SkeletonShapes) {
  SkeletonShapes["CIRCLE"] = "circle";
  SkeletonShapes["REACT"] = "rect";
  SkeletonShapes["TEXT"] = "text";
})(SkeletonShapes || (SkeletonShapes = {}));
export var SkeletonAnimation;
(function (SkeletonAnimation) {
  SkeletonAnimation["PULSE"] = "pulse";
  SkeletonAnimation["PROGRESS"] = "progress";
  SkeletonAnimation["FALSE"] = "false";
})(SkeletonAnimation || (SkeletonAnimation = {}));
export const SkeletonClass = {
  root: 'gov-skeleton',
  loader: 'gov-skeleton__loader',
};
//# sourceMappingURL=constants.js.map
