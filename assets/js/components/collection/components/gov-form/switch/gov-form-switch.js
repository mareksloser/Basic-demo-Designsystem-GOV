import { h, Host } from "@stencil/core";
import { createID } from "../../../utils/string.utils";
import { validateProp } from "../../../helpers/Validate/props";
import { FormSwitchClass, FormSwitchSizes } from "./constants";
import { govHost, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { delay } from "../../../utils/utils";
import { govForm } from "../../../helpers/Dom/form";
import Fragment from "../../../helpers/Fragment";
export class GovFormSwitch {
  constructor() {
    this.value = undefined;
    this.noLabel = false;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.name = undefined;
    this.size = "m";
    this.identifier = undefined;
    this.invalid = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.checkboxId = createID("GovCheckbox");
    this.h = govHost(this.host);
    this.f = govForm(this.h);
  }
  validateSize(newValue) {
    validateProp(FormSwitchSizes, newValue, FormSwitchClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", "switch");
  }
  componentWillLoad() {
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
        return (h("label", null, children));
      }
      return children;
    };
    return (h(Host, { class: this.h.classes(FormSwitchClass.root), checked: this.checked, size: this.size, invalid: toBoolAttrIfDefined(this.invalid) }, h("div", { class: FormSwitchClass.holder }, wrapCheckbox(h(Fragment, null, h("input", { class: FormSwitchClass.input, id: this.identifier || this.checkboxId, type: "checkbox", value: this.value, name: this.name, disabled: this.disabled, checked: this.checked, onClick: this.onClickHandler.bind(this), onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), ref: el => (this.inputRef = el), required: this.required, "aria-checked": this.checked, "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": toBoolAttrIfDefined(this.disabled) }), h("span", { class: FormSwitchClass.indicator }), h("slot", { name: "label" }))))));
  }
  onClickHandler(e) {
    e.stopPropagation();
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: FormSwitchClass.root,
      checked: this.checked,
      value: this.value,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: FormSwitchClass.root,
      checked: this.checked,
      value: this.value,
      originalEvent: e,
    });
  }
  onChangeHandler(e) {
    this.checked = e.target.checked;
    e.stopPropagation();
    this.govChange.emit({
      component: FormSwitchClass.root,
      checked: this.checked,
      value: this.value,
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
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormSwitchClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormSwitchClass.root);
    validateWcagLabelFor(this.identifier || this.checkboxId, this.wcagLabelledBy, FormSwitchClass.root);
  }
  static get is() { return "gov-form-switch"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-switch.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-switch.css"]
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
          "text": "Value of switch"
        },
        "attribute": "value",
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
          "text": "Switch button state"
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
          "text": "Makes the switch component disabled.\nThis prevents users from being able to interact with the switch, and conveys its inactive state to assistive technologies."
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
          "text": "Name of the switch."
        },
        "attribute": "name",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormSwitchSizesType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xs\"",
          "references": {
            "FormSwitchSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/switch/constants.ts::FormSwitchSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Switch's size."
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
          "text": "Custom switch identifier."
        },
        "attribute": "identifier",
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
          "text": "Emitted when the switch has focus."
        },
        "complexType": {
          "original": "FormSwitchEvent",
          "resolved": "FormSwitchEvent",
          "references": {
            "FormSwitchEvent": {
              "location": "import",
              "path": "./gov-form-switch.types",
              "id": "../../../packages/core/src/components/gov-form/switch/gov-form-switch.types.ts::FormSwitchEvent"
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
          "text": "Emitted when the switch loses focus."
        },
        "complexType": {
          "original": "FormSwitchEvent",
          "resolved": "FormSwitchEvent",
          "references": {
            "FormSwitchEvent": {
              "location": "import",
              "path": "./gov-form-switch.types",
              "id": "../../../packages/core/src/components/gov-form/switch/gov-form-switch.types.ts::FormSwitchEvent"
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
          "text": "Emitted when the switch change value."
        },
        "complexType": {
          "original": "FormSwitchEvent",
          "resolved": "FormSwitchEvent",
          "references": {
            "FormSwitchEvent": {
              "location": "import",
              "path": "./gov-form-switch.types",
              "id": "../../../packages/core/src/components/gov-form/switch/gov-form-switch.types.ts::FormSwitchEvent"
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
//# sourceMappingURL=gov-form-switch.js.map
