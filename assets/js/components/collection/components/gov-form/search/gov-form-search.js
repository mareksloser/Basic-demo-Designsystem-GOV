import { h, Host } from "@stencil/core";
import { FormSearchClass } from "./constants";
export class GovFormSearch {
  constructor() {
    this.variant = 'secondary';
  }
  render() {
    return (h(Host, { class: FormSearchClass.root }, h("span", { class: FormSearchClass.input }, h("slot", { name: "input" })), h("span", { class: FormSearchClass.button }, h("slot", { name: "button" }))));
  }
  static get is() { return "gov-form-search"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-search.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-search.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormSearchVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "FormSearchVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/search/constants.ts::FormSearchVariantType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variation of the form input."
        },
        "attribute": "variant",
        "reflect": true,
        "defaultValue": "'secondary'"
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-form-search.js.map
