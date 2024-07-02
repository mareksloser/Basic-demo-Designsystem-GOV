'use strict';

const sizes = require('./sizes-79872c2a.js');
const utils = require('./utils-c9b1bba3.js');
const variants = require('./variants-f5ffeef3.js');
const constants$1 = require('./constants-caad94b4.js');
const constants$2 = require('./constants-6df82618.js');
const constants = require('./constants-97eea364.js');

const FormCheckboxSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M', '_L']);
const FormCheckboxClass = {
  root: 'gov-form-checkbox',
  check: 'gov-form-checkbox__check',
  label: 'gov-form-checkbox__label',
};

utils.pick(sizes.Sizes, ['_M', '_L', '_XL']);
const FormControlClass = {
  root: 'gov-form-control',
  holder: 'gov-form-control__holder',
  bottom: 'gov-form-control__bottom',
};

const FormInputSizes = utils.pick(sizes.Sizes, ['_S', '_M', '_L', '_XL']);
const FormInputVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
var InputTypes;
(function (InputTypes) {
  InputTypes["COLOR"] = "color";
  InputTypes["DATE"] = "date";
  InputTypes["DATETIME_LOCAL"] = "datetime-local";
  InputTypes["EMAIL"] = "email";
  InputTypes["MONTH"] = "month";
  InputTypes["NUMBER"] = "number";
  InputTypes["PASSWORD"] = "password";
  InputTypes["SEARCH"] = "search";
  InputTypes["TEL"] = "tel";
  InputTypes["TEXT"] = "text";
  InputTypes["TIME"] = "time";
  InputTypes["URL"] = "url";
  InputTypes["WEEK"] = "week";
})(InputTypes || (InputTypes = {}));
var Type;
(function (Type) {
  Type["RESET"] = "reset";
})(Type || (Type = {}));
const FormInputClass = {
  root: 'gov-form-input',
};

const FormSelectSizes = utils.pick(sizes.Sizes, ['_M', '_L', '_XL']);
const FormSelectVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
const FormSelectClass = {
  root: 'gov-form-select',
  icon: 'gov-form-select__icon',
};

const FormMultiselectSizes = utils.pick(sizes.Sizes, ['_M', '_L', '_XL']);
const FormMultiselectVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
const FormMultiSelectClass = {
  root: 'gov-form-multi-select',
  wrap: 'gov-form-multi-select__wrap',
  list: 'gov-form-multi-select__list',
  item: 'gov-form-multi-select__item',
};

const FormSwitchSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M', '_L']);
const FormSwitchClass = {
  root: 'gov-form-switch',
  holder: 'gov-form-switch__holder',
  input: 'gov-form-switch__input',
  indicator: 'gov-form-switch__indicator',
};

const FormRadioSizes = utils.pick(sizes.Sizes, ['_XS', '_S', '_M', '_L']);
const FormRadioClass = {
  root: 'gov-form-radio',
  holder: 'gov-form-radio__holder',
  input: 'gov-form-radio__input',
  indicator: 'gov-form-radio__indicator',
  label: 'gov-form-radio__label',
};

const govForm = (govHost) => {
  return {
    get govHost() {
      return govHost;
    },
    passAttrToControl(name, value) {
      if (this.control) {
        this.control.setAttribute(name, value);
      }
    },
    passAttrToLabel(name, value) {
      if (this.label) {
        this.label.setAttribute(name, value);
      }
    },
    get hasGroupChildren() {
      if (this.control) {
        return this.control.querySelectorAll('gov-form-group > *').length > 1;
      }
      return false;
    },
    get control() {
      if (this.govHost.name === FormControlClass.root) {
        return this.govHost.hostElement;
      }
      return this.govHost.getParent(FormControlClass.root);
    },
    get label() {
      const innerLabel = this.govHost.hostElement.querySelector(`.${constants.FormLabelClass.root}`);
      if (innerLabel) {
        return innerLabel;
      }
      if (this.control) {
        return this.control.querySelector(`.${constants.FormLabelClass.root}`);
      }
      return null;
    },
    get mainElementsInControl() {
      const formElements = [
        FormSelectClass.root,
        FormInputClass.root,
        FormSwitchClass.root,
        FormCheckboxClass.root,
        FormRadioClass.root,
        FormMultiSelectClass.root,
        constants$2.FormAutocompleteClass.root,
      ];
      if (this.control) {
        const elements = formElements.map(el => `${el}:first-of-type`).join(', ');
        return Array.from(this.control.querySelectorAll(elements));
      }
      return [];
    },
    get messageElements() {
      if (this.control) {
        return Array.from(this.control.querySelectorAll(constants$1.FormMessageClass.root));
      }
      return [];
    },
  };
};

exports.FormCheckboxClass = FormCheckboxClass;
exports.FormCheckboxSizes = FormCheckboxSizes;
exports.FormControlClass = FormControlClass;
exports.FormInputClass = FormInputClass;
exports.FormInputSizes = FormInputSizes;
exports.FormInputVariants = FormInputVariants;
exports.FormMultiSelectClass = FormMultiSelectClass;
exports.FormMultiselectSizes = FormMultiselectSizes;
exports.FormMultiselectVariants = FormMultiselectVariants;
exports.FormRadioClass = FormRadioClass;
exports.FormRadioSizes = FormRadioSizes;
exports.FormSelectClass = FormSelectClass;
exports.FormSelectSizes = FormSelectSizes;
exports.FormSelectVariants = FormSelectVariants;
exports.FormSwitchClass = FormSwitchClass;
exports.FormSwitchSizes = FormSwitchSizes;
exports.govForm = govForm;

//# sourceMappingURL=form-74063d50.js.map