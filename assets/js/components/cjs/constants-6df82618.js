'use strict';

const sizes = require('./sizes-79872c2a.js');
const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');

const FormAutocompleteSizes = utils.pick(sizes.Sizes, ['_M', '_L', '_XL']);
const FormAutocompleteVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
const FormAutocompleteClass = {
  root: 'gov-form-autocomplete',
  list: 'gov-form-autocomplete__list',
  item: 'gov-form-autocomplete__item',
  empty: 'gov-form-autocomplete__item--empty',
  loading: 'gov-form-autocomplete__item--loading',
};

exports.FormAutocompleteClass = FormAutocompleteClass;
exports.FormAutocompleteSizes = FormAutocompleteSizes;
exports.FormAutocompleteVariants = FormAutocompleteVariants;

//# sourceMappingURL=constants-6df82618.js.map