import { V as Variants } from './variants-2b936d58.js';
import { S as Sizes } from './sizes-6c5943b4.js';
import { p as pick } from './utils-c057a3fa.js';

const WizardVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const WizardSizes = pick(Sizes, ['_XS', '_S', '_M']);
const WizardClass = {
  root: 'gov-wizard',
};
const WizardItemClass = {
  root: 'gov-wizard-item',
  header: 'gov-wizard-item__header',
  arrow: 'gov-wizard-item__arrow',
  title: 'gov-wizard-item__title',
  name: 'gov-wizard-item__name',
  label: 'gov-wizard-item__label',
  annot: 'gov-wizard-item__annot',
  prefix: 'gov-wizard-item__prefix',
  content: 'gov-wizard-item__content',
};

export { WizardItemClass as W, WizardClass as a, WizardSizes as b, WizardVariants as c };

//# sourceMappingURL=constants-2499979c.js.map