import { FormControlClass } from "../../components/gov-form/control/constants";
import { FormInputClass } from "../../components/gov-form/input/constants";
import { FormSelectClass } from "../../components/gov-form/select/constants";
import { FormMultiSelectClass } from "../../components/gov-form/multiselect/constants";
import { FormSwitchClass } from "../../components/gov-form/switch/constants";
import { FormCheckboxClass } from "../../components/gov-form/checkbox/constants";
import { FormRadioClass } from "../../components/gov-form/radio/constants";
import { FormMessageClass } from "../../components/gov-form/message/constants";
import { FormAutocompleteClass } from "../../components/gov-form/autocomplete/constants";
import { FormLabelClass } from "../../components/gov-form/label/constants";
export const govForm = (govHost) => {
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
//# sourceMappingURL=form.js.map
