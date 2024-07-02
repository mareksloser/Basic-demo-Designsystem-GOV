import { h, Host } from "@stencil/core";
import { govForm } from "../../../helpers/Dom/form";
import { govHost, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { validateProp } from "../../../helpers/Validate/props";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { createID } from "../../../utils/string.utils";
import { delay } from "../../../utils/utils";
import { FormSelectClass, FormSelectSizes, FormSelectVariants } from "./constants";
export class GovFormSelect {
  constructor() {
    this.value = undefined;
    this.identifier = undefined;
    this.variant = 'secondary';
    this.size = 'm';
    this.name = undefined;
    this.required = false;
    this.success = undefined;
    this.disabled = false;
    this.invalid = undefined;
    this.wcagActiveDescendant = undefined;
    this.wcagControls = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.focused = undefined;
    this.options = [];
    this.h = govHost(this.host);
    this.f = govForm(this.h);
    this.selectId = createID('GovSelect');
  }
  validateVariant(newValue) {
    validateProp(FormSelectVariants, newValue, FormSelectClass.root);
  }
  validateSize(newValue) {
    validateProp(FormSelectSizes, newValue, FormSelectClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  watchValue() {
    this.markSelectedValue();
  }
  passControlAttrs() {
    this.f.passAttrToControl('size', this.size);
    this.f.passAttrToControl('invalid', toBoolAttr(this.invalid));
    this.f.passAttrToControl('type', 'select');
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.markSelectedValue();
    this.passControlAttrs();
    this.f.passAttrToLabel('required', String(this.required));
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  markSelectedValue() {
    this.host.querySelectorAll('option').forEach((option) => {
      if (option.value === this.value) {
        option.setAttribute('selected', 'selected');
      }
      else {
        option.removeAttribute('selected');
      }
    });
  }
  render() {
    return (h(Host, { class: FormSelectClass.root, size: this.size, variant: this.variant }, this.h.hasSlot('prefix') && h("slot", { name: "prefix" }), h("span", { class: "element" }, h("gov-icon", { slot: "right-icon", name: "chevron-down", class: "icon-arrow" }), this.h.hasSlot('right-icon') && !(this.success || this.invalid) && h("slot", { name: "right-icon" }), this.success && h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "check-lg" }), this.invalid && h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "exclamation-lg" }), h("select", { id: this.identifier || this.selectId, onFocus: this.onFocusHandler.bind(this), onChange: this.onChangeHandler.bind(this), onBlur: this.onBlurHandler.bind(this), required: this.required, name: this.name, disabled: this.disabled, ref: el => (this.selectRef = el), "aria-disabled": toBoolAttrIfDefined(this.disabled), "aria-activedescendant": this.wcagActiveDescendant, "aria-controls": this.wcagControls, "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-owns": this.wcagOwns }, h("slot", null), this.options.map((option) => {
      return (h("option", { value: option.value, selected: option.value === this.value, disabled: option === null || option === void 0 ? void 0 : option.disabled }, option.label));
    }))), this.h.hasSlot('sufix') && h("slot", { name: "sufix" })));
  }
  onFocusHandler(e) {
    this.focused = true;
    this.govFocus.emit({
      component: FormSelectClass.root,
      originalEvent: e,
      value: this.value,
    });
  }
  onBlurHandler(e) {
    this.focused = false;
    this.govBlur.emit({
      component: FormSelectClass.root,
      originalEvent: e,
      value: this.value,
    });
  }
  onChangeHandler(e) {
    this.value = e.target.value;
    e.stopPropagation();
    this.govChange.emit({
      component: FormSelectClass.root,
      originalEvent: e,
      value: this.value,
    });
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
   * Sets the selection options
   */
  async setOptions(options) {
    if (Array.isArray(options)) {
      this.options = options;
    }
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagActiveDescendant, 'wcag-active-descendant', FormSelectClass.root);
    validateWcagRef(this.wcagControls, 'wcag-controls', FormSelectClass.root);
    validateWcagRef(this.wcagDescribedBy, 'wcag-described-by', FormSelectClass.root);
    validateWcagRef(this.wcagOwns, 'wcag-owns', FormSelectClass.root);
    validateWcagLabelFor(this.identifier || this.selectId, this.wcagLabelledBy, FormSelectClass.root);
  }
  static get is() { return "gov-form-select"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-select.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-select.css"]
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
          "text": "Value of select"
        },
        "attribute": "value",
        "reflect": true
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
          "text": "Custom select identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormSelectVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "FormSelectVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/select/constants.ts::FormSelectVariantType"
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
        "reflect": false,
        "defaultValue": "'secondary'"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormSelectSizesType",
          "resolved": "\"l\" | \"m\" | \"xl\"",
          "references": {
            "FormSelectSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/select/constants.ts::FormSelectSizesType"
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
      "wcagActiveDescendant": {
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
          "text": "Indicates the id of a related component\u2019s visually focused element."
        },
        "attribute": "wcag-active-descendant",
        "reflect": false
      },
      "wcagControls": {
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
          "text": "Use this prop to add an aria-controls attribute. Use the attribute to indicate the id of a component controlled by this component."
        },
        "attribute": "wcag-controls",
        "reflect": false
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
          "original": "FormSelectEvent",
          "resolved": "FormSelectEvent",
          "references": {
            "FormSelectEvent": {
              "location": "import",
              "path": "./gov-form-select.types",
              "id": "../../../packages/core/src/components/gov-form/select/gov-form-select.types.ts::FormSelectEvent"
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
          "original": "FormSelectEvent",
          "resolved": "FormSelectEvent",
          "references": {
            "FormSelectEvent": {
              "location": "import",
              "path": "./gov-form-select.types",
              "id": "../../../packages/core/src/components/gov-form/select/gov-form-select.types.ts::FormSelectEvent"
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
          "original": "FormSelectEvent",
          "resolved": "FormSelectEvent",
          "references": {
            "FormSelectEvent": {
              "location": "import",
              "path": "./gov-form-select.types",
              "id": "../../../packages/core/src/components/gov-form/select/gov-form-select.types.ts::FormSelectEvent"
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
      "setOptions": {
        "complexType": {
          "signature": "(options: FormSelectOption[]) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "FormSelectOption": {
              "location": "import",
              "path": "./gov-form-select.types",
              "id": "../../../packages/core/src/components/gov-form/select/gov-form-select.types.ts::FormSelectOption"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets the selection options",
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
        "propName": "size",
        "methodName": "watchDisabled"
      }, {
        "propName": "value",
        "methodName": "watchValue"
      }];
  }
}
//# sourceMappingURL=gov-form-select.js.map
