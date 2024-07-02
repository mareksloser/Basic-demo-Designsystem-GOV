import { h, Host } from "@stencil/core";
import { govForm } from "../../../helpers/Dom/form";
import { govHost, toBoolAttr, toBoolAttrIfDefined, toOnOffAttrIfDefined } from "../../../helpers/Dom/template";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { validateProp } from "../../../helpers/Validate/props";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { createID } from "../../../utils/string.utils";
import { delay } from "../../../utils/utils";
import { FormInputClass, FormInputSizes, FormInputVariants, } from "./constants";
var Tags;
(function (Tags) {
  Tags["INPUT"] = "input";
  Tags["TEXTAREA"] = "textarea";
})(Tags || (Tags = {}));
export class GovFormInput {
  constructor() {
    this.value = undefined;
    this.identifier = undefined;
    this.variant = "secondary";
    this.success = undefined;
    this.size = "m";
    this.name = undefined;
    this.multiline = undefined;
    this.rows = undefined;
    this.cols = undefined;
    this.required = false;
    this.disabled = false;
    this.placeholder = undefined;
    this.readonly = undefined;
    this.minlength = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.max = undefined;
    this.autocomplete = undefined;
    this.autocorrect = undefined;
    this.type = undefined;
    this.inputType = "text";
    this.role = undefined;
    this.invalid = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.wcagAutocomplete = undefined;
    this.wcagExpanded = undefined;
    this.focused = undefined;
    this.h = govHost(this.host);
    this.inputId = createID("GovInput");
    this.f = govForm(this.h);
  }
  validateVariant(newValue) {
    validateProp(FormInputVariants, newValue, FormInputClass.root);
  }
  validateSize(newValue) {
    validateProp(FormInputSizes, newValue, FormInputClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", this.multiline ? Tags.TEXTAREA : Tags.INPUT);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.passControlAttrs();
    this.f.passAttrToLabel("required", String(this.required));
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const Tag = this.multiline ? Tags.TEXTAREA : Tags.INPUT;
    return (h(Host, { class: FormInputClass.root, size: this.size, variant: this.variant, type: this.type }, this.h.hasSlot("prefix") && h("slot", { name: "prefix" }), h("span", { class: "element" }, this.h.hasSlot("left-icon") && h("slot", { name: "left-icon" }), this.h.hasSlot("right-icon") && !(this.success || this.invalid) && h("slot", { name: "right-icon" }), this.success && !this.multiline &&
      h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "check-lg" }), this.invalid && !this.multiline &&
      h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "exclamation-lg" }), h(Tag, { type: this.inputType, disabled: this.disabled, id: this.identifier || this.inputId, name: this.name, onFocus: this.onFocusHandler.bind(this), onInput: this.onInputHandler.bind(this), onBlur: this.onBlurHandler.bind(this), onKeyUp: this.onKeyUpHandler.bind(this), onKeyDown: this.onKeyDownHandler.bind(this), ref: el => (this.inputRef = el), placeholder: this.placeholder, value: this.value, readonly: toBoolAttrIfDefined(this.readonly), autocomplete: toOnOffAttrIfDefined(this.autocomplete), autocorrect: toOnOffAttrIfDefined(this.autocorrect), minlength: this.minlength, maxlength: this.maxlength, min: this.min, max: this.max, required: this.required, rows: this.rows, cols: this.cols, role: this.role, "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-disabled": toBoolAttrIfDefined(this.disabled), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-owns": this.wcagOwns, "aria-expanded": toBoolAttrIfDefined(this.wcagExpanded), "aria-autocomplete": this.wcagAutocomplete })), this.h.hasSlot("sufix") && h("slot", { name: "sufix" })));
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.focused = true;
    this.govFocus.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.focused = false;
    this.govBlur.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onKeyUpHandler(e) {
    e.stopPropagation();
    this.govKeyUp.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onKeyDownHandler(e) {
    e.stopPropagation();
    this.govKeyDown.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onInputHandler(e) {
    this.value = e.target.value;
    e.stopPropagation();
    this.govInput.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  /**
   * Returns the current state of the component
   */
  async setFocus(options) {
    return this.inputRef.focus(options);
  }
  /**
   * Sets the ordered value of the element
   */
  async setValue(value) {
    this.value = value;
  }
  /**
   * Clears input value
   */
  async clearValue() {
    this.value = "";
    this.inputRef.value = "";
  }
  /**
   * Returns an instance of the native html input element
   */
  async getRef() {
    return this.inputRef;
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormInputClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormInputClass.root);
    validateWcagRef(this.wcagOwns, "wcag-owns", FormInputClass.root);
    validateWcagLabelFor(this.identifier || this.inputId, this.wcagLabelledBy, FormInputClass.root);
  }
  static get is() { return "gov-form-input"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-input.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-input.css"]
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
          "text": "Custom input identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormInputVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "FormInputVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/input/constants.ts::FormInputVariantType"
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
        "reflect": false,
        "defaultValue": "\"secondary\""
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
          "original": "FormInputSizesType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xl\"",
          "references": {
            "FormInputSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/input/constants.ts::FormInputSizesType"
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
        "defaultValue": "\"m\""
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
      "multiline": {
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
          "text": "Generates a texarea for the possibility of multiple lines"
        },
        "attribute": "multiline",
        "reflect": false
      },
      "rows": {
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
          "text": "Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows"
        },
        "attribute": "rows",
        "reflect": false
      },
      "cols": {
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
          "text": "Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols"
        },
        "attribute": "cols",
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
        "reflect": false
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
      "min": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "string | number",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Minimum value that is acceptable and valid for the input containing the attribute"
        },
        "attribute": "min",
        "reflect": false
      },
      "max": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "string | number",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Maximum value that is acceptable and valid for the input containing the attribute"
        },
        "attribute": "max",
        "reflect": false
      },
      "autocomplete": {
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
          "text": "Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autocomplete"
        },
        "attribute": "autocomplete",
        "reflect": false
      },
      "autocorrect": {
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
          "text": "Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autocorrect"
        },
        "attribute": "autocorrect",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Type",
          "resolved": "Type",
          "references": {
            "Type": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/input/constants.ts::Type"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defineds the visual style of input"
        },
        "attribute": "type",
        "reflect": false
      },
      "inputType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputType",
          "resolved": "\"color\" | \"date\" | \"datetime-local\" | \"email\" | \"month\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\" | \"week\"",
          "references": {
            "InputType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/input/constants.ts::InputType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "input-type",
        "reflect": false,
        "defaultValue": "\"text\""
      },
      "role": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Nullable<string>",
          "resolved": "string",
          "references": {
            "Nullable": {
              "location": "import",
              "path": "../../../types/interfaces",
              "id": "../../../packages/core/src/types/interfaces.ts::Nullable"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/input_role"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "role",
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
      },
      "wcagAutocomplete": {
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
          "text": "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value."
        },
        "attribute": "wcag-autocomplete",
        "reflect": false
      },
      "wcagExpanded": {
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
          "text": "Attribute is set on an element to indicate if a control is expanded or collapsed"
        },
        "attribute": "wcag-expanded",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "focused": {}
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
          "original": "FormInputEvent",
          "resolved": "FormInputEvent",
          "references": {
            "FormInputEvent": {
              "location": "import",
              "path": "./gov-form-input.types",
              "id": "../../../packages/core/src/components/gov-form/input/gov-form-input.types.ts::FormInputEvent"
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
          "original": "FormInputEvent",
          "resolved": "FormInputEvent",
          "references": {
            "FormInputEvent": {
              "location": "import",
              "path": "./gov-form-input.types",
              "id": "../../../packages/core/src/components/gov-form/input/gov-form-input.types.ts::FormInputEvent"
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
          "original": "FormInputEvent",
          "resolved": "FormInputEvent",
          "references": {
            "FormInputEvent": {
              "location": "import",
              "path": "./gov-form-input.types",
              "id": "../../../packages/core/src/components/gov-form/input/gov-form-input.types.ts::FormInputEvent"
            }
          }
        }
      }, {
        "method": "govKeyUp",
        "name": "gov-keyup",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the input change value."
        },
        "complexType": {
          "original": "FormInputEvent",
          "resolved": "FormInputEvent",
          "references": {
            "FormInputEvent": {
              "location": "import",
              "path": "./gov-form-input.types",
              "id": "../../../packages/core/src/components/gov-form/input/gov-form-input.types.ts::FormInputEvent"
            }
          }
        }
      }, {
        "method": "govKeyDown",
        "name": "gov-keydown",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the input change value."
        },
        "complexType": {
          "original": "FormInputEvent",
          "resolved": "FormInputEvent",
          "references": {
            "FormInputEvent": {
              "location": "import",
              "path": "./gov-form-input.types",
              "id": "../../../packages/core/src/components/gov-form/input/gov-form-input.types.ts::FormInputEvent"
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
          "text": "Clears input value",
          "tags": []
        }
      },
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
          "text": "Returns an instance of the native html input element",
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
        "propName": "type",
        "methodName": "watchDisabled"
      }, {
        "propName": "size",
        "methodName": "watchDisabled"
      }];
  }
}
//# sourceMappingURL=gov-form-input.js.map
