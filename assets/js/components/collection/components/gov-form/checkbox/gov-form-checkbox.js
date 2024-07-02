import { h, Host } from "@stencil/core";
import { createID } from "../../../utils/string.utils";
import { validateProp } from "../../../helpers/Validate/props";
import { FormCheckboxClass, FormCheckboxSizes } from "./constants";
import { govHost, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { delay } from "../../../utils/utils";
import { govForm } from "../../../helpers/Dom/form";
import Fragment from "../../../helpers/Fragment";
export class GovFormCheckbox {
  constructor() {
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.name = undefined;
    this.size = "m";
    this.identifier = undefined;
    this.noLabel = false;
    this.invalid = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.checkboxId = createID("GovCheckbox");
    this.h = govHost(this.host);
    this.f = govForm(this.h);
  }
  validateSize(newValue) {
    validateProp(FormCheckboxSizes, newValue, FormCheckboxClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
  }
  componentWillLoad() {
    this.f.passAttrToControl("type", "checkbox");
    this.passControlAttrs();
  }
  async componentDidRender() {
    this.f.passAttrToLabel("identifier", this.identifier || this.checkboxId);
    this.f.passAttrToLabel("required", String(this.required));
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const wrapCheckbox = (children) => {
      if (this.noLabel) {
        return (h("label", { class: FormCheckboxClass.label }, children));
      }
      return children;
    };
    return (h(Host, { class: FormCheckboxClass.root, checked: this.checked, size: this.size, invalid: toBoolAttrIfDefined(this.invalid) }, wrapCheckbox(h(Fragment, null, h("input", { id: this.identifier || this.checkboxId, type: "checkbox", value: this.value, name: this.name, checked: this.checked, onClick: this.onClickHandler.bind(this), onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), required: this.required, disabled: this.disabled, ref: el => (this.inputRef = el), "aria-checked": toBoolAttr(this.checked), "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": toBoolAttrIfDefined(this.disabled) }), h("span", null, h("slot", { name: "label" }), h("gov-icon", { class: FormCheckboxClass.check, name: "check-lg" }))))));
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: FormCheckboxClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: FormCheckboxClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onClickHandler(e) {
    e.stopPropagation();
  }
  onChangeHandler(e) {
    this.checked = e.target.checked;
    e.stopPropagation();
    this.govChange.emit({
      component: FormCheckboxClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  /**
   * Returns the reference of the native element
   */
  async getRef() {
    return this.inputRef;
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormCheckboxClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormCheckboxClass.root);
    validateWcagLabelFor(this.identifier || this.checkboxId, this.wcagLabelledBy, FormCheckboxClass.root);
  }
  static get is() { return "gov-form-checkbox"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-checkbox.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-checkbox.css"]
    };
  }
  static get properties() {
    return {
      "value": {
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
          "text": "Value of checkbox"
        },
        "attribute": "value",
        "reflect": false
      },
      "checked": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Checkbox button state"
        },
        "attribute": "checked",
        "reflect": true,
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
          "text": "Makes the checkbox component disabled.\nThis prevents users from being able to interact with the checkbox, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Name of the checkbox."
        },
        "attribute": "name",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormCheckboxSizesType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xs\"",
          "references": {
            "FormCheckboxSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/checkbox/constants.ts::FormCheckboxSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Checkboxes size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "\"m\""
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
          "text": "Custom checkbox identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "noLabel": {
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
          "text": "When you can't use the form label."
        },
        "attribute": "no-label",
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
      }
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
          "text": "Emitted when the checkbox has focus."
        },
        "complexType": {
          "original": "FormCheckboxEvent",
          "resolved": "FormCheckboxEvent",
          "references": {
            "FormCheckboxEvent": {
              "location": "import",
              "path": "./gov-form-checkbox.types",
              "id": "../../../packages/core/src/components/gov-form/checkbox/gov-form-checkbox.types.ts::FormCheckboxEvent"
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
          "text": "Emitted when the checkbox loses focus."
        },
        "complexType": {
          "original": "FormCheckboxEvent",
          "resolved": "FormCheckboxEvent",
          "references": {
            "FormCheckboxEvent": {
              "location": "import",
              "path": "./gov-form-checkbox.types",
              "id": "../../../packages/core/src/components/gov-form/checkbox/gov-form-checkbox.types.ts::FormCheckboxEvent"
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
          "text": "Emitted when the checkbox change value."
        },
        "complexType": {
          "original": "FormCheckboxEvent",
          "resolved": "FormCheckboxEvent",
          "references": {
            "FormCheckboxEvent": {
              "location": "import",
              "path": "./gov-form-checkbox.types",
              "id": "../../../packages/core/src/components/gov-form/checkbox/gov-form-checkbox.types.ts::FormCheckboxEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "getRef": {
        "complexType": {
          "signature": "() => Promise<HTMLInputElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLInputElement": {
              "location": "global",
              "id": "global::HTMLInputElement"
            }
          },
          "return": "Promise<HTMLInputElement>"
        },
        "docs": {
          "text": "Returns the reference of the native element",
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
      }];
  }
}
//# sourceMappingURL=gov-form-checkbox.js.map
