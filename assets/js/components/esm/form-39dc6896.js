import { S as Sizes } from './sizes-6c5943b4.js';
import { p as pick } from './utils-c057a3fa.js';
import { V as Variants } from './variants-2b936d58.js';
import { F as FormMessageClass } from './constants-3df712e2.js';
import { F as FormAutocompleteClass } from './constants-47d7a8bc.js';
import { F as FormLabelClass } from './constants-ebec7de8.js';

const FormCheckboxSizes = pick(Sizes, ['_XS', '_S', '_M', '_L']);
const FormCheckboxClass = {
  root: 'gov-form-checkbox',
  check: 'gov-form-checkbox__check',
  label: 'gov-form-checkbox__label',
};

pick(Sizes, ['_M', '_L', '_XL']);
const FormControlClass = {
  root: 'gov-form-control',
  holder: 'gov-form-control__holder',
  bottom: 'gov-form-control__bottom',
};

const FormInputSizes = pick(Sizes, ['_S', '_M', '_L', '_XL']);
const FormInputVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
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

const FormSelectSizes = pick(Sizes, ['_M', '_L', '_XL']);
const FormSelectVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
const FormSelectClass = {
  root: 'gov-form-select',
  icon: 'gov-form-select__icon',
};

const FormMultiselectSizes = pick(Sizes, ['_M', '_L', '_XL']);
const FormMultiselectVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
const FormMultiSelectClass = {
  root: 'gov-form-multi-select',
  wrap: 'gov-form-multi-select__wrap',
  list: 'gov-form-multi-select__list',
  item: 'gov-form-multi-select__item',
};

const FormSwitchSizes = pick(Sizes, ['_XS', '_S', '_M', '_L']);
const FormSwitchClass = {
  root: 'gov-form-switch',
  holder: 'gov-form-switch__holder',
  input: 'gov-form-switch__input',
  indicator: 'gov-form-switch__indicator',
};

const FormRadioSizes = pick(Sizes, ['_XS', '_S', '_M', '_L']);
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
      const innerLabel = this.govHost.hostElement.querySelector(`.${FormLabelClass.root}`);
      if (innerLabel) {
        return innerLabel;
      }
      if (this.control) {
        return this.control.querySelector(`.${FormLabelClass.root}`);
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
        FormAutocompleteClass.root,
      ];
      if (this.control) {
        const elements = formElements.map(el => `${el}:first-of-type`).join(', ');
        return Array.from(this.control.querySelectorAll(elements));
      }
      return [];
    },
    get messageElements() {
      if (this.control) {
        return Array.from(this.control.querySelectorAll(FormMessageClass.root));
      }
      return [];
    },
  };
};

export { FormCheckboxClass as F, FormCheckboxSizes as a, FormControlClass as b, FormMultiSelectClass as c, FormMultiselectVariants as d, FormMultiselectSizes as e, FormRadioClass as f, govForm as g, FormRadioSizes as h, FormSwitchClass as i, FormSwitchSizes as j, FormInputClass as k, FormInputVariants as l, FormInputSizes as m, FormSelectClass as n, FormSelectVariants as o, FormSelectSizes as p };

//# sourceMappingURL=form-39dc6896.js.map