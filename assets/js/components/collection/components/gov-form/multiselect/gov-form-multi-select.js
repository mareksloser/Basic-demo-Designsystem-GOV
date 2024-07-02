import { h, Host } from "@stencil/core";
import { govForm } from "../../../helpers/Dom/form";
import { govHost, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { validateProp } from "../../../helpers/Validate/props";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { createID, removeDiacritics } from "../../../utils/string.utils";
import { delay } from "../../../utils/utils";
import { FormMultiSelectClass, FormMultiselectSizes, FormMultiselectVariants } from "./constants";
import { hasOwnProperty } from "../../../utils/helpers.types";
export class GovFormMultiSelect {
  constructor() {
    this.identifier = undefined;
    this.placeholder = undefined;
    this.variant = undefined;
    this.size = 'm';
    this.name = undefined;
    this.hideSelectedList = false;
    this.required = false;
    this.disabled = false;
    this.invalid = undefined;
    this.success = undefined;
    this.messageEmpty = 'Nebyly nalezeny žádné výsledky';
    this.messageLoading = 'Načítám...';
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.focused = undefined;
    this.value = undefined;
    this.selectedOptions = [];
    this.options = [];
    this.selectId = createID('GovSelect');
    this.listId = createID('GovMultiList');
    this.h = govHost(this.host);
    this.f = govForm(this.h);
  }
  validateVariant(newValue) {
    validateProp(FormMultiselectVariants, newValue, FormMultiSelectClass.root);
  }
  validateSize(newValue) {
    validateProp(FormMultiselectSizes, newValue, FormMultiSelectClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl('size', this.size);
    this.f.passAttrToControl('invalid', toBoolAttr(this.invalid));
    this.f.passAttrToControl('success', toBoolAttr(this.success));
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.watchDisabled();
  }
  getAvailableOptions(ignoreFilter = false) {
    if (Array.isArray(this.options) && this.options.length) {
      if (ignoreFilter) {
        return this.options;
      }
      return this.options.filter((option) => {
        const isSelected = this.selectedOptions.findIndex((selected) => selected.value === option.value);
        return (isSelected !== -1 || (option === null || option === void 0 ? void 0 : option.disabled)) ? false : true;
      });
    }
    return Array.from(this.selectRef.querySelectorAll('option'))
      .filter((option) => {
      if (ignoreFilter) {
        return true;
      }
      return !(option.disabled || option.selected);
    })
      .map((option) => ({ name: option.textContent, value: option.value }));
  }
  initAutocomplete() {
    this.autocompleteRef.addEventListener('gov-select', this.onSelectHandler.bind(this));
    this.autocompleteRef.addEventListener('gov-input', this.onInputHandler.bind(this));
    this.autocompleteRef.addEventListener('gov-focus', this.onFocusHandler.bind(this));
    this.autocompleteRef.addEventListener('gov-blur', this.onBlurHandler.bind(this));
    this.autocompleteRef
      .setSearchCallback(value => {
      return new Promise(resolve => {
        const data = this.getAvailableOptions();
        if (String(value).length === 0) {
          return resolve(data);
        }
        resolve(data.filter(({ name }) => {
          if (!name)
            return false;
          return removeDiacritics(name).toLowerCase().indexOf(removeDiacritics(value).toLowerCase()) > -1;
        }));
      });
    })
      .then();
  }
  getOptionIndex(value) {
    return this.selectedOptions.findIndex(option => option.value === value.value && option.name === value.name);
  }
  getOptionElement(value) {
    return this.selectRef.querySelector('option[value="' + value.value + '"]');
  }
  selectOption(newOption, notify = true) {
    const index = this.getOptionIndex(newOption);
    if (index === -1) {
      this.selectedOptions = [...this.selectedOptions, newOption];
      if (notify) {
        this.govChange.emit({
          component: FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
        this.govSelect.emit({
          component: FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
      }
      const option = this.getOptionElement(newOption);
      if (option) {
        option.selected = true;
      }
    }
  }
  removeOption(removeOption, notify = true) {
    const index = this.getOptionIndex(removeOption);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
      this.selectedOptions = [...this.selectedOptions];
      if (notify) {
        this.govChange.emit({
          component: FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
        this.govRemove.emit({
          component: FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
      }
      const option = this.getOptionElement(removeOption);
      if (option) {
        option.selected = false;
      }
    }
  }
  async componentDidLoad() {
    this.initAutocomplete();
    this.selectRef.querySelectorAll('option').forEach((option) => {
      if (option.selected) {
        this.selectOption({
          name: option.textContent,
          value: option.value,
        }, false);
      }
    });
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: FormMultiSelectClass.root, size: this.size, variant: this.variant }, h("div", { class: FormMultiSelectClass.wrap }, h("div", { class: "element" }, h("gov-form-autocomplete", { value: this.value, disabled: this.disabled, identifier: this.identifier || this.selectId, required: false, size: this.size, variant: this.variant, placeholder: this.placeholder, "message-empty": this.messageEmpty, "message-loading": this.messageLoading, ref: el => (this.autocompleteRef = el), minlength: 0, wcagDescribedBy: this.wcagDescribedBy, wcagLabelledBy: this.wcagLabelledBy, wcagOwns: this.listId }), h("gov-icon", { slot: "right-icon", class: "icon-arrow", name: "chevron-down" }), this.h.hasSlot('right-icon') && !(this.success || this.invalid) && h("slot", { name: "right-icon" }), this.success && h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "check-lg" }), this.invalid && h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "exclamation-lg" }), h("select", { hidden: true, "aria-hidden": toBoolAttr(true), multiple: true, required: this.required, name: this.name, disabled: this.disabled, ref: el => (this.selectRef = el), "aria-disabled": toBoolAttrIfDefined(this.disabled), "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-owns": this.wcagOwns }, h("slot", null), this.options.map((option) => {
      return (h("option", { value: option.value, selected: option.value === this.value, disabled: option === null || option === void 0 ? void 0 : option.disabled }, option.name));
    })))), this.hideSelectedList === false ? (h("ul", { role: "listbox", id: this.listId, class: FormMultiSelectClass.list }, this.selectedOptions.map(option => {
      return (h("li", { class: FormMultiSelectClass.item, role: "option" }, option.name, h("gov-button", { wcagLabel: 'Odebrat vybranou položku ' + option.name, variant: "primary", type: "base", size: "s", "on-gov-click": () => this.onTagRemove(option) }, h("gov-icon", { name: "x-lg" }))));
    }))) : null));
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.focused = true;
    this.govFocus.emit({
      component: FormMultiSelectClass.root,
      originalEvent: e,
      value: this.selectedOptions,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    e.stopPropagation();
    this.focused = false;
    this.govBlur.emit({
      component: FormMultiSelectClass.root,
      originalEvent: e,
      value: this.selectedOptions,
    });
  }
  onInputHandler(e) {
    this.value = e.detail.value;
    e.stopPropagation();
  }
  onSelectHandler(e) {
    e.stopPropagation();
    const value = e.detail.selected;
    this.selectOption(value);
    this.value = '';
    this.autocompleteRef.clearValue();
    this.autocompleteRef.focus();
  }
  onTagRemove(removeOption) {
    this.removeOption(removeOption);
  }
  /**
   * Returns the current state of the component
   */
  async setFocus(options) {
    return this.selectRef.focus(options);
  }
  /**
   * Sets the ordered value of the element
   */
  async setValue(value) {
    this.value = value;
  }
  /**
   * Returns an instance of the native html select element
   */
  async getRef() {
    return this.selectRef;
  }
  /**
   * Returns a list of selected items
   */
  async getSelectedOptions() {
    return this.selectedOptions;
  }
  /**
   * Setting a list of options to choose from
   */
  async setOptions(options) {
    if (Array.isArray(options)) {
      this.options = [...options];
    }
  }
  /**
   * Returns all available options
   */
  async getOptions(ignoreFilter = true) {
    return this.getAvailableOptions(ignoreFilter);
  }
  /**
   * Setting the list of selected options
   */
  async setSelectedOptions(options) {
    if (Array.isArray(options)) {
      this.selectedOptions = [...options];
    }
  }
  /**
   * To remove an option from the selected list
   */
  async removeSelectedOption(option, notify = false) {
    if (typeof option === 'object' && hasOwnProperty(option, 'name') && hasOwnProperty(option, 'value')) {
      this.removeOption(option, notify);
    }
  }
  /**
   * Returns an instance of the native html select element
   */
  async setSelectedOption(option, notify = false) {
    if (typeof option === 'object' && hasOwnProperty(option, 'name') && hasOwnProperty(option, 'value')) {
      this.selectOption(option, notify);
    }
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagDescribedBy, 'wcag-described-by', FormMultiSelectClass.root);
    validateWcagRef(this.wcagLabelledBy, 'wcag-labelled-by', FormMultiSelectClass.root);
    validateWcagRef(this.wcagOwns, 'wcag-owns', FormMultiSelectClass.root);
    validateWcagLabelFor(this.identifier || this.selectId, this.wcagLabelledBy, FormMultiSelectClass.root);
  }
  static get is() { return "gov-form-multi-select"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-multi-select.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-multi-select.css"]
    };
  }
  static get properties() {
    return {
      "identifier": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Custom select identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Custom select placeholder."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormMultiselectVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "FormMultiselectVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/multiselect/constants.ts::FormMultiselectVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the form select."
        },
        "attribute": "variant",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormMultiselectSizesType",
          "resolved": "\"l\" | \"m\" | \"xl\"",
          "references": {
            "FormMultiselectSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/multiselect/constants.ts::FormMultiselectSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Select\u2019s size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Name of the select."
        },
        "attribute": "name",
        "reflect": false
      },
      "hideSelectedList": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Option to hide the list of selected items"
        },
        "attribute": "hide-selected-list",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.\nWhen using this property you need to also set \u201Cnovalidate\u201D attribute to your form element to prevent browser from displaying its own validation errors."
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Makes the select component disabled.\nThis prevents users from being able to interact with the select, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "invalid": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the entered value does not conform to the format expected by the application."
        },
        "attribute": "invalid",
        "reflect": false
      },
      "success": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the entered value of child form element does conform to the format expected by the application."
        },
        "attribute": "success",
        "reflect": false
      },
      "messageEmpty": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Custom message for when there is a blank sheet"
        },
        "attribute": "message-empty",
        "reflect": false,
        "defaultValue": "'Nebyly nalezeny \u017E\u00E1dn\u00E9 v\u00FDsledky'"
      },
      "messageLoading": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Custom message for when data is loaded"
        },
        "attribute": "message-loading",
        "reflect": false,
        "defaultValue": "'Na\u010D\u00EDt\u00E1m...'"
      },
      "wcagDescribedBy": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the id of a component that describes the input."
        },
        "attribute": "wcag-described-by",
        "reflect": false
      },
      "wcagLabelledBy": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the id of a component that labels the input."
        },
        "attribute": "wcag-labelled-by",
        "reflect": false
      },
      "wcagOwns": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the id of a component that describes the input."
        },
        "attribute": "wcag-owns",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "focused": {},
      "value": {},
      "selectedOptions": {},
      "options": {}
    };
  }
  static get events() {
    return [{
        "method": "govFocus",
        "name": "gov-focus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the select has focus."
        },
        "complexType": {
          "original": "FormMultiselectEvent",
          "resolved": "FormMultiselectEvent",
          "references": {
            "FormMultiselectEvent": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::FormMultiselectEvent"
            }
          }
        }
      }, {
        "method": "govBlur",
        "name": "gov-blur",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the select loses focus."
        },
        "complexType": {
          "original": "FormMultiselectEvent",
          "resolved": "FormMultiselectEvent",
          "references": {
            "FormMultiselectEvent": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::FormMultiselectEvent"
            }
          }
        }
      }, {
        "method": "govChange",
        "name": "gov-change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the select change value."
        },
        "complexType": {
          "original": "FormMultiselectEvent",
          "resolved": "FormMultiselectEvent",
          "references": {
            "FormMultiselectEvent": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::FormMultiselectEvent"
            }
          }
        }
      }, {
        "method": "govSelect",
        "name": "gov-select",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when an item is selected"
        },
        "complexType": {
          "original": "FormMultiselectEvent",
          "resolved": "FormMultiselectEvent",
          "references": {
            "FormMultiselectEvent": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::FormMultiselectEvent"
            }
          }
        }
      }, {
        "method": "govRemove",
        "name": "gov-remove",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when an item is removed"
        },
        "complexType": {
          "original": "FormMultiselectEvent",
          "resolved": "FormMultiselectEvent",
          "references": {
            "FormMultiselectEvent": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::FormMultiselectEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "(options?: FocusOptions) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "FocusOptions": {
              "location": "global",
              "id": "global::FocusOptions"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Returns the current state of the component",
          "tags": []
        }
      },
      "setValue": {
        "complexType": {
          "signature": "(value: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets the ordered value of the element",
          "tags": []
        }
      },
      "getRef": {
        "complexType": {
          "signature": "() => Promise<HTMLSelectElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLSelectElement": {
              "location": "global",
              "id": "global::HTMLSelectElement"
            }
          },
          "return": "Promise<HTMLSelectElement>"
        },
        "docs": {
          "text": "Returns an instance of the native html select element",
          "tags": []
        }
      },
      "getSelectedOptions": {
        "complexType": {
          "signature": "() => Promise<GovFormMultiSelectItem[]>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormMultiSelectItem": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::GovFormMultiSelectItem"
            }
          },
          "return": "Promise<GovFormMultiSelectItem[]>"
        },
        "docs": {
          "text": "Returns a list of selected items",
          "tags": []
        }
      },
      "setOptions": {
        "complexType": {
          "signature": "(options: GovFormMultiSelectItem[]) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormMultiSelectItem": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::GovFormMultiSelectItem"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Setting a list of options to choose from",
          "tags": []
        }
      },
      "getOptions": {
        "complexType": {
          "signature": "(ignoreFilter?: boolean) => Promise<GovFormMultiSelectItem[]>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormMultiSelectItem": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::GovFormMultiSelectItem"
            }
          },
          "return": "Promise<GovFormMultiSelectItem[]>"
        },
        "docs": {
          "text": "Returns all available options",
          "tags": []
        }
      },
      "setSelectedOptions": {
        "complexType": {
          "signature": "(options: GovFormMultiSelectItem[]) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormMultiSelectItem": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::GovFormMultiSelectItem"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Setting the list of selected options",
          "tags": []
        }
      },
      "removeSelectedOption": {
        "complexType": {
          "signature": "(option: GovFormMultiSelectItem, notify?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormMultiSelectItem": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::GovFormMultiSelectItem"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "To remove an option from the selected list",
          "tags": []
        }
      },
      "setSelectedOption": {
        "complexType": {
          "signature": "(option: GovFormMultiSelectItem, notify?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormMultiSelectItem": {
              "location": "import",
              "path": "./gov-form-multi-select.types",
              "id": "../../../packages/core/src/components/gov-form/multiselect/gov-form-multi-select.types.ts::GovFormMultiSelectItem"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Returns an instance of the native html select element",
          "tags": []
        }
      },
      "validateWcag": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Validate the WCAG attributes of the component",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "variant",
        "methodName": "validateVariant"
      }, {
        "propName": "size",
        "methodName": "validateSize"
      }, {
        "propName": "disabled",
        "methodName": "watchDisabled"
      }, {
        "propName": "invalid",
        "methodName": "watchDisabled"
      }, {
        "propName": "success",
        "methodName": "watchDisabled"
      }, {
        "propName": "size",
        "methodName": "watchDisabled"
      }];
  }
}
//# sourceMappingURL=gov-form-multi-select.js.map
