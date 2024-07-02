import { h, Host } from "@stencil/core";
import { toBoolAttr } from "../../../helpers/Dom/template";
import { validateProp } from "../../../helpers/Validate/props";
import { createID } from "../../../utils/string.utils";
import { delay, has, throttle } from "../../../utils/utils";
import { FormAutocompleteClass, FormAutocompleteSizes, FormAutocompleteVariants } from "./constants";
export class GovFormAutocomplete {
  constructor() {
    this.templateResolver = item => item[this.nameKey];
    this.value = '';
    this.identifier = undefined;
    this.variant = undefined;
    this.success = undefined;
    this.size = 'm';
    this.nameKey = 'name';
    this.name = undefined;
    this.required = false;
    this.disabled = false;
    this.placeholder = undefined;
    this.readonly = undefined;
    this.invalid = undefined;
    this.minlength = 3;
    this.maxlength = undefined;
    this.messageEmpty = 'Nebyly nalezeny žádné výsledky';
    this.messageLoading = 'Načítám...';
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.focused = undefined;
    this.processing = false;
    this.arrowCounter = -1;
    this.list = [];
    this.listBoxId = createID('GovListBox');
  }
  validateVariant(newValue) {
    validateProp(FormAutocompleteVariants, newValue, FormAutocompleteClass.root);
  }
  validateSize(newValue) {
    validateProp(FormAutocompleteSizes, newValue, FormAutocompleteClass.root);
  }
  onArrowUp() {
    if (this.arrowCounter > 0) {
      this.arrowCounter = this.arrowCounter - 1;
      this.moveToView().finally();
    }
  }
  onArrowDown() {
    if (this.arrowCounter < this.list.length - 1) {
      this.arrowCounter = this.arrowCounter + 1;
      this.moveToView().finally();
    }
  }
  async moveToView() {
    await delay(200);
    const heightOfList = this.listRef.offsetHeight;
    const selected = this.listRef.querySelector('li[aria-selected="true"]');
    if (selected && heightOfList) {
      const offsetTop = selected.offsetTop;
      this.listRef.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }
  doSearch() {
    if (Number.isInteger(this.minlength) && this.isValueAccepted === false && this.minlength) {
      this.list = [];
      this.arrowCounter = -1;
      this.processing = false;
      return;
    }
    if (this.searchCallback) {
      this.processing = true;
      this.searchCallback(this.value)
        .then(response => (this.list = response))
        .catch(() => (this.list = []))
        .finally(() => {
        this.arrowCounter = -1;
        this.processing = false;
      });
    }
  }
  get isValueAccepted() {
    if (typeof this.value === 'string') {
      return this.value.length >= this.minlength;
    }
    else {
      return false;
    }
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
  }
  render() {
    return (h(Host, { class: FormAutocompleteClass.root, size: this.size, variant: this.variant }, h("gov-form-input", { placeholder: this.placeholder, name: this.name, disabled: this.disabled, readonly: this.readonly, autocomplete: false, size: this.size, variant: this.variant, required: this.required, invalid: this.invalid, success: this.success, role: 'searchbox', value: this.value, minlength: this.minlength, maxlength: this.maxlength, "on-gov-input": throttle(this.onInputHandler.bind(this), 200), "on-gov-keyup": this.onKeyUpHandler.bind(this), "on-gov-keydown": this.onKeyDownHandler.bind(this), "on-gov-focus": this.onFocusHandler.bind(this), "on-gov-blur": this.onBlurHandler.bind(this), wcagAutocomplete: 'list', wcagDescribedBy: this.wcagDescribedBy, wcagLabelledBy: this.wcagLabelledBy, wcagOwns: [this.listBoxId, this.wcagOwns].join(' '), wcagExpanded: this.list.length && this.focused, ref: el => (this.inputRef = el) }, h("slot", { slot: "right-icon", name: "right-icon" })), h("ul", { class: FormAutocompleteClass.list, role: 'listbox', id: this.listBoxId, ref: el => (this.listRef = el) }, this.focused && this.list.length === 0 && this.processing === false && this.isValueAccepted && this.messageEmpty ? (h("li", { class: FormAutocompleteClass.empty }, this.messageEmpty)) : null, this.focused && this.processing === true && this.isValueAccepted ? (h("li", { class: FormAutocompleteClass.loading }, h("gov-icon", { name: "loader", class: "gov-spin-animation" }), "\u00A0", this.messageLoading)) : null, this.list.map((item, index) => {
      const isSelected = this.arrowCounter === index;
      return (h("li", { class: FormAutocompleteClass.item, innerHTML: this.templateResolver(item, isSelected), role: 'option', "aria-posinset": index, tabindex: isSelected ? 0 : -1, "aria-setsize": this.list.length, onTouchStart: (e) => this.onSelectHandler(e, index), onMouseDown: (e) => this.onSelectHandler(e, index), "aria-selected": toBoolAttr(isSelected) }));
    }))));
  }
  onFocusHandler(e) {
    this.focused = true;
    this.arrowCounter = -1;
    if ((this.value || this.minlength === 0) && this.searchCallback) {
      this.doSearch();
    }
    e.stopPropagation();
    this.govFocus.emit({
      originalEvent: e,
      component: FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
  }
  onBlurHandler(e) {
    this.focused = false;
    this.list = [];
    this.arrowCounter = -1;
    e.stopPropagation();
    this.govBlur.emit({
      originalEvent: e,
      component: FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
  }
  onInputHandler(e) {
    this.value = e.target.value;
    e.stopPropagation();
    this.govInput.emit({
      originalEvent: e,
      component: FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
    this.doSearch();
  }
  onSelectHandler(e, index = -1) {
    let selected = null;
    if (index > -1) {
      selected = this.list[index];
    }
    else if (has(this.arrowCounter, this.list)) {
      selected = this.list[this.arrowCounter];
    }
    if (selected) {
      this.govSelect.emit({
        component: FormAutocompleteClass.root,
        value: this.value,
        selected: selected,
        originalEvent: e,
      });
      this.list = [];
      if (has(this.nameKey, selected) && typeof selected[this.nameKey] === 'string') {
        this.value = selected[this.nameKey];
      }
    }
  }
  onKeyUpHandler(e) {
    const event = e.detail.originalEvent;
    e.stopPropagation();
    event.stopPropagation();
    if (event.keyCode === 38)
      this.onArrowUp();
    else if (event.keyCode === 40)
      this.onArrowDown();
    else if (event.keyCode === 13) {
      e.preventDefault();
      event.preventDefault();
      this.onSelectHandler(e);
    }
  }
  onKeyDownHandler(e) {
    const event = e.detail.originalEvent;
    e.stopPropagation();
    event.stopPropagation();
    if (event.keyCode === 13) {
      e.preventDefault();
      event.preventDefault();
    }
  }
  /**
   * Returns the current state of the component
   */
  async setFocus(options) {
    return this.inputRef.focus(options);
  }
  /**
   * Set options for list
   */
  async setOptions(options) {
    this.list = Array.isArray(options) ? options : [];
    this.arrowCounter = -1;
  }
  /**
   * Clears whisperer value
   */
  async clearValue() {
    this.value = '';
    this.inputRef.value = '';
    await this.inputRef.clearValue();
  }
  /**
   * Clears whisperer value
   */
  async setProcessing(status) {
    this.processing = status;
  }
  /**
   * Set a custom asynchronous function for the whisperer
   */
  async setSearchCallback(callback) {
    this.searchCallback = callback;
  }
  /**
   * Setting a custom whisper result template
   * @param callback
   */
  async setTemplateResolver(callback) {
    this.templateResolver = callback;
  }
  static get is() { return "gov-form-autocomplete"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-autocomplete.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-autocomplete.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value of input"
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "''"
      },
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
          "text": "Custom input identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "VariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "VariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/constants.ts::VariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the form input."
        },
        "attribute": "variant",
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
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SizesType",
          "resolved": "\"l\" | \"m\" | \"xl\"",
          "references": {
            "SizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/constants.ts::SizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Input\u2019s size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "nameKey": {
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
          "text": "Main key name in the object"
        },
        "attribute": "name-key",
        "reflect": false,
        "defaultValue": "'name'"
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
          "text": "Name of the input."
        },
        "attribute": "name",
        "reflect": false
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
          "text": "Makes the input component disabled.\nThis prevents users from being able to interact with the select, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Text that appears in the form control when it has no value set"
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "readonly": {
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
          "text": "The value is not editable"
        },
        "attribute": "readonly",
        "reflect": false
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
      "minlength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Minimum length (number of characters) of value"
        },
        "attribute": "minlength",
        "reflect": false,
        "defaultValue": "3"
      },
      "maxlength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum length (number of characters) of value"
        },
        "attribute": "maxlength",
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
          "text": "Same as original parameter\nhttps://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns"
        },
        "attribute": "wcag-owns",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "focused": {},
      "processing": {},
      "arrowCounter": {},
      "list": {}
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
          "text": "Emitted when the input has focus."
        },
        "complexType": {
          "original": "FormAutocompleteEvent",
          "resolved": "FormAutocompleteEvent",
          "references": {
            "FormAutocompleteEvent": {
              "location": "import",
              "path": "./gov-form-autocomplete.types",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/gov-form-autocomplete.types.ts::FormAutocompleteEvent"
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
          "text": "Emitted when the input loses focus."
        },
        "complexType": {
          "original": "FormAutocompleteEvent",
          "resolved": "FormAutocompleteEvent",
          "references": {
            "FormAutocompleteEvent": {
              "location": "import",
              "path": "./gov-form-autocomplete.types",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/gov-form-autocomplete.types.ts::FormAutocompleteEvent"
            }
          }
        }
      }, {
        "method": "govInput",
        "name": "gov-input",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the input change value."
        },
        "complexType": {
          "original": "FormAutocompleteEvent",
          "resolved": "FormAutocompleteEvent",
          "references": {
            "FormAutocompleteEvent": {
              "location": "import",
              "path": "./gov-form-autocomplete.types",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/gov-form-autocomplete.types.ts::FormAutocompleteEvent"
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
          "text": "Emitted when the input change value."
        },
        "complexType": {
          "original": "FormAutocompleteEvent",
          "resolved": "FormAutocompleteEvent",
          "references": {
            "FormAutocompleteEvent": {
              "location": "import",
              "path": "./gov-form-autocomplete.types",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/gov-form-autocomplete.types.ts::FormAutocompleteEvent"
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
      "setOptions": {
        "complexType": {
          "signature": "(options: GovFormAutocompleteItem[]) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormAutocompleteItem": {
              "location": "import",
              "path": "./gov-form-autocomplete.types",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/gov-form-autocomplete.types.ts::GovFormAutocompleteItem"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Set options for list",
          "tags": []
        }
      },
      "clearValue": {
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
          "text": "Clears whisperer value",
          "tags": []
        }
      },
      "setProcessing": {
        "complexType": {
          "signature": "(status: boolean) => Promise<void>",
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
          "text": "Clears whisperer value",
          "tags": []
        }
      },
      "setSearchCallback": {
        "complexType": {
          "signature": "(callback: (value: string) => Promise<any>) => Promise<void>",
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
          "text": "Set a custom asynchronous function for the whisperer",
          "tags": []
        }
      },
      "setTemplateResolver": {
        "complexType": {
          "signature": "(callback: (item: GovFormAutocompleteItem) => string) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "callback"
                }],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "GovFormAutocompleteItem": {
              "location": "import",
              "path": "./gov-form-autocomplete.types",
              "id": "../../../packages/core/src/components/gov-form/autocomplete/gov-form-autocomplete.types.ts::GovFormAutocompleteItem"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Setting a custom whisper result template",
          "tags": [{
              "name": "param",
              "text": "callback"
            }]
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
      }];
  }
}
//# sourceMappingURL=gov-form-autocomplete.js.map
