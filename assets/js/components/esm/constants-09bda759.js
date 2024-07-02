import { S as Sizes } from './sizes-6c5943b4.js';
import { V as Variants } from './variants-2b936d58.js';
import { p as pick } from './utils-c057a3fa.js';

const AccordionSizes = pick(Sizes, ['_XS', '_S', '_M', '_L']);
const AccordionVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'CUSTOM']);
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

export { AccordionItemClass as A, AccordionClass as a, AccordionSizes as b, AccordionVariants as c };

//# sourceMappingURL=constants-09bda759.js.map