import { h, Host } from "@stencil/core";
import { createID } from "../../../utils/string.utils";
import { validateProp } from "../../../helpers/Validate/props";
import { FormRadioClass, FormRadioSizes } from "./constants";
import { govHost, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { delay } from "../../../utils/utils";
import { govForm } from "../../../helpers/Dom/form";
import Fragment from "../../../helpers/Fragment";
export class GovFormRadio {
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
    this.radioId = createID("GovRadio");
    this.h = govHost(this.host);
    this.f = govForm(this.h);
  }
  validateSize(newValue) {
    validateProp(FormRadioSizes, newValue, FormRadioClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", "radio");
  }
  componentWillLoad() {
    this.passControlAttrs();
  }
  async componentDidRender() {
    this.f.passAttrToLabel("identifier", this.identifier || this.radioId);
    this.f.passAttrToLabel("required", String(this.required));
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const wrapRadio = children => {
      if (this.noLabel) {
        return h("label", { class: FormRadioClass.label }, children);
      }
      return children;
    };
    return (h(Host, { class: FormRadioClass.root, checked: this.checked, size: this.size, invalid: toBoolAttrIfDefined(this.invalid) }, h("div", { class: FormRadioClass.holder }, wrapRadio(h(Fragment, null, h("input", { class: FormRadioClass.input, id: this.identifier || this.radioId, type: "radio", value: this.value, name: this.name, checked: this.checked, disabled: this.disabled, onClick: this.onClickHandler.bind(this), onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), ref: el => (this.inputRef = el), required: this.required, "aria-checked": this.checked, "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": toBoolAttrIfDefined(this.disabled) }), h("span", null, h("slot", { name: "label" })))))));
  }
  onClickHandler(e) {
    e.stopPropagation();
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: FormRadioClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: FormRadioClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onChangeHandler(e) {
    this.checked = e.target.checked;
    e.stopPropagation();
    this.govChange.emit({
      component: FormRadioClass.root,
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
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormRadioClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormRadioClass.root);
    validateWcagLabelFor(this.identifier || this.radioId, this.wcagLabelledBy, FormRadioClass.root);
  }
  static get is() { return "gov-form-radio"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-radio.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-radio.css"]
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
          "text": "Value of radio"
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
          "text": "Radio button state"
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
          "text": "Makes the radio component disabled.\nThis prevents users from being able to interact with the radio, and conveys its inactive state to assistive technologies."
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
          "text": "Name of the radio."
        },
        "attribute": "name",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormRadioSizesType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xs\"",
          "references": {
            "FormRadioSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/radio/constants.ts::FormRadioSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Radio's size."
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
          "text": "Custom radio identifier."
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
          "text": "Emitted when the radio has focus."
        },
        "complexType": {
          "original": "FormRadioEvent",
          "resolved": "FormRadioEvent",
          "references": {
            "FormRadioEvent": {
              "location": "import",
              "path": "./gov-form-radio.types",
              "id": "../../../packages/core/src/components/gov-form/radio/gov-form-radio.types.ts::FormRadioEvent"
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
          "text": "Emitted when the radio loses focus."
        },
        "complexType": {
          "original": "FormRadioEvent",
          "resolved": "FormRadioEvent",
          "references": {
            "FormRadioEvent": {
              "location": "import",
              "path": "./gov-form-radio.types",
              "id": "../../../packages/core/src/components/gov-form/radio/gov-form-radio.types.ts::FormRadioEvent"
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
          "text": "Emitted when the radio change value."
        },
        "complexType": {
          "original": "FormRadioEvent",
          "resolved": "FormRadioEvent",
          "references": {
            "FormRadioEvent": {
              "location": "import",
              "path": "./gov-form-radio.types",
              "id": "../../../packages/core/src/components/gov-form/radio/gov-form-radio.types.ts::FormRadioEvent"
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
//# sourceMappingURL=gov-form-radio.js.map
