import { h, Host } from "@stencil/core";
import { FormLabelClass } from "./constants";
export class GovFormLabel {
  constructor() {
    this.identifier = undefined;
    this.size = 'm';
    this.required = false;
    this.legend = false;
  }
  render() {
    const Tag = this.legend ? 'legend' : 'label';
    return (h(Host, { class: FormLabelClass.root, size: this.size }, h(Tag, { class: FormLabelClass.label, htmlFor: this.identifier, onClick: () => this.govClick.emit() }, h("slot", null), this.required ? h("span", { class: "gov-color--error-500" }, "\u00A0*") : null)));
  }
  static get is() { return "gov-form-label"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-label.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-label.css"]
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
          "text": "Identifier for label."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormLabelSizesTypes",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
          "references": {
            "FormLabelSizesTypes": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/label/constants.ts::FormLabelSizesTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Label's size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
          "text": "Set whether the input is required or not."
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      },
      "legend": {
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
          "text": "Use label as a legend for better accessibility.\nNote: Don't forget to set the fieldset attribute of the gov-form-control component"
        },
        "attribute": "legend",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "govClick",
        "name": "gov-click",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the label click."
        },
        "complexType": {
          "original": "PointerEvent",
          "resolved": "PointerEvent",
          "references": {
            "PointerEvent": {
              "location": "global",
              "id": "global::PointerEvent"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=gov-form-label.js.map
