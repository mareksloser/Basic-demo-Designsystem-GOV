'use strict';

const variants = require('./variants-f5ffeef3.js');
const sizes = require('./sizes-79872c2a.js');
const utils = require('./utils-c9b1bba3.js');

const WizardVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const WizardSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M']);
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

exports.WizardClass = WizardClass;
exports.WizardItemClass = WizardItemClass;
exports.WizardSizes = WizardSizes;
exports.WizardVariants = WizardVariants;

//# sourceMappingURL=constants-440cd5c8.js.map