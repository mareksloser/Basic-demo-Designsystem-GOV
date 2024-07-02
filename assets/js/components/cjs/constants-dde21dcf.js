'use strict';

const sizes = require('./sizes-79872c2a.js');
const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');

const AccordionSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M', '_L']);
const AccordionVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'CUSTOM']);
const AccordionClass = {
  root: 'gov-accordion',
};
const AccordionItemClass = {
  root: 'gov-accordion-item',
  header: 'gov-accordion-item__header',
  icon: 'gov-accordion-item__icon',
  title: 'gov-accordion-item__title',
  label: 'gov-accordion-item__label',
  annotation: 'gov-accordion-item__annotation',
  suffix: 'gov-accordion-item__suffix',
  right: 'gov-accordion-item__right',
  arrow: 'gov-accordion-item__arrow',
  content: 'gov-accordion-item__content',
};

exports.AccordionClass = AccordionClass;
exports.AccordionItemClass = AccordionItemClass;
exports.AccordionSizes = AccordionSizes;
exports.AccordionVariants = AccordionVariants;

//# sourceMappingURL=constants-dde21dcf.js.map