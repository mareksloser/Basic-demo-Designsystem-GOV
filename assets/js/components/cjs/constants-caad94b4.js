'use strict';

const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');

const FormMessageVariants = utils.pick(variants.Variants, ['SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
const FormMessageClass = {
  root: 'gov-form-message',
  content: 'gov-form-message__content',
  icon: 'gov-form-message__icon',
};

exports.FormMessageClass = FormMessageClass;
exports.FormMessageVariants = FormMessageVariants;

//# sourceMappingURL=constants-caad94b4.js.map