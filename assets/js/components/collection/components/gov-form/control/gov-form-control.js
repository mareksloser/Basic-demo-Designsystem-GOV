import { h, Host } from "@stencil/core";
import { govForm } from "../../../helpers/Dom/form";
import { govHost } from "../../../helpers/Dom/template";
import { createID, splitByWhitespace } from "../../../utils/string.utils";
import { FormControlClass } from "./constants";
export class GovFormControl {
  constructor() {
    this.gap = undefined;
    this.identifier = undefined;
    this.invalid = false;
    this.disabled = false;
    this.success = false;
    this.fieldset = false;
    this.size = "m";
    this.h = govHost(this.host);
    this.f = govForm(this.h);
    this.controlId = createID("GovFormControl");
  }
  componentDidRender() {
    this.passChildAttrs();
    this.invalidChildAttrs();
    this.syncControlMessages();
    this.formElementDescriptionControl();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  passChildAttrs() {
    const formElements = [
      "gov-form-select",
      "gov-form-input",
      "gov-form-switch",
      "gov-form-checkbox",
      "gov-form-radio",
      "gov-form-multi-select",
      "gov-form-file",
      "gov-form-search",
    ];
    this.h.passChildAttr(formElements, "success", this.success);
    if (this.f.hasGroupChildren === false) {
      this.h.passChildAttr([...formElements, "gov-form-label"], "identifier", this.identifier || this.controlId);
    }
  }
  invalidChildAttrs() {
    const formElements = [
      "gov-form-select",
      "gov-form-input",
      "gov-form-switch",
      "gov-form-checkbox",
      "gov-form-radio",
      "gov-form-multi-select",
      "gov-form-file",
      "gov-form-search",
    ];
    this.h.passChildAttr(formElements, "invalid", this.invalid);
    if (this.f.hasGroupChildren === false) {
      this.h.passChildAttr([...formElements, "gov-form-label"], "identifier", this.identifier || this.controlId);
    }
  }
  formElementDescriptionControl() {
    const bottomSlot = this.host.querySelector("." + FormControlClass.bottom);
    if (!bottomSlot)
      return;
    this.observer = new MutationObserver(function () {
      this.syncControlMessages();
    }.bind(this));
    this.observer.observe(bottomSlot, { childList: true });
  }
  syncControlMessages() {
    Promise.all(this.f.messageElements.map((message) => message.identifier())).then((ids) => {
      this.f.mainElementsInControl.forEach((element) => {
        const currentValue = splitByWhitespace(element.getAttribute("wcag-described-by"));
        element.removeAttribute("wcag-described-by");
        if (Array.isArray(currentValue)) {
          currentValue.forEach(id => (id.indexOf("GovFormMessage") === -1 ? ids.push(id) : null));
        }
        if (ids.length) {
          element.setAttribute("wcag-described-by", ids.join(" "));
        }
      });
    });
  }
  render() {
    const Tag = this.fieldset ? "fieldset" : "div";
    return (h(Host, { size: this.size, class: this.h.classes(FormControlClass.root) }, h(Tag, { class: FormControlClass.holder }, this.h.hasSlot("top") && h("slot", { name: "top" }), h("slot", null), this.h.hasSlot("bottom") && (h("div", { class: FormControlClass.bottom }, h("slot", { name: "bottom" }))))));
  }
  static get is() { return "gov-form-control"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-control.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-control.css"]
    };
  }
  static get properties() {
    return {
      "gap": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormControlSizesType",
          "resolved": "\"l\" | \"m\" | \"xl\"",
          "references": {
            "FormControlSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/control/constants.ts::FormControlSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the space between nested components."
        },
        "attribute": "gap",
        "reflect": false
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
          "text": "Form element identifier"
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
          "text": "Indicates the entered value of child form element does not conform to the format expected by the application."
        },
        "attribute": "invalid",
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
          "text": "/**\n  Indicates the form element is disabled"
        },
        "attribute": "disabled",
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
          "text": "/**\n  Indicates the entered value of child form element does conform to the format expected by the application."
        },
        "attribute": "success",
        "reflect": false,
        "defaultValue": "false"
      },
      "fieldset": {
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
          "text": "Use control as a fieldset for better accessibility.\nNote: Don't forget to set the legend attribute of the gov-form-label component"
        },
        "attribute": "fieldset",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormControlSizesType",
          "resolved": "\"l\" | \"m\" | \"xl\"",
          "references": {
            "FormControlSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/control/constants.ts::FormControlSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Form element size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "\"m\""
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-form-control.js.map
