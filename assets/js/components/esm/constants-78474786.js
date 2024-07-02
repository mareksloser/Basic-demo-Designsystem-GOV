import { V as Variants } from './variants-2b936d58.js';
import { S as Sizes } from './sizes-6c5943b4.js';
import { p as pick } from './utils-c057a3fa.js';

const StepperVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const StepperSizes = pick(Sizes, ['_XS', '_S', '_M']);
const StepperClass = {
  root: 'gov-stepper',
};
const StepperItemClass = {
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

export { StepperItemClass as S, StepperClass as a, StepperSizes as b, StepperVariants as c };

//# sourceMappingURL=constants-78474786.js.map