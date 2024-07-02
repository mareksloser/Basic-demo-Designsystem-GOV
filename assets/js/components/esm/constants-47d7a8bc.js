import { S as Sizes } from './sizes-6c5943b4.js';
import { V as Variants } from './variants-2b936d58.js';
import { p as pick } from './utils-c057a3fa.js';

const FormAutocompleteSizes = pick(Sizes, ['_M', '_L', '_XL']);
const FormAutocompleteVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
const FormAutocompleteClass = {
  root: 'gov-form-autocomplete',
  list: 'gov-form-autocomplete__list',
  item: 'gov-form-autocomplete__item',
  empty: 'gov-form-autocomplete__item--empty',
  loading: 'gov-form-autocomplete__item--loading',
};

export { FormAutocompleteClass as F, FormAutocompleteVariants as a, FormAutocompleteSizes as b };

//# sourceMappingURL=constants-47d7a8bc.js.map