'use strict';

const variants = require('./variants-f5ffeef3.js');
const sizes = require('./sizes-79872c2a.js');
const utils = require('./utils-c9b1bba3.js');

const StepperVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const StepperSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M']);
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

exports.StepperClass = StepperClass;
exports.StepperItemClass = StepperItemClass;
exports.StepperSizes = StepperSizes;
exports.StepperVariants = StepperVariants;

//# sourceMappingURL=constants-0c6c8e11.js.map