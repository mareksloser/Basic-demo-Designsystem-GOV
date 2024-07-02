import { Variants } from "../../core/constants/variants";
import { Sizes } from "../../core/constants/sizes";
import { pick } from "../../utils/utils";
export const StepperVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
export const StepperSizes = pick(Sizes, ['_XS', '_S', '_M']);
export const StepperClass = {
  root: 'gov-stepper',
};
export const StepperItemClass = {
  root: 'gov-stepper-item',
  rootWithAnnot: 'gov-stepper-item gov-stepper-item--w-annot',
  header: 'gov-stepper-item__header',
  title: 'gov-stepper-item__title',
  label: 'gov-stepper-item__label',
  name: 'gov-stepper-item__name',
  annot: 'gov-stepper-item__annot',
  prefix: 'gov-stepper-item__prefix',
  content: 'gov-stepper-item__content',
  suffix: 'gov-stepper-item__suffix',
};
//# sourceMappingURL=constants.js.map
