import { h, Host } from "@stencil/core";
import { LayoutClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovLayout {
  constructor() {
    this.type = 'stretch';
    this.variant = undefined;
    this.inverse = false;
    this.h = govHost(this.host);
  }
  typeClass(originalClass, type, variant, inverse) {
    const isType = type ? '-' + type : '';
    const isVariant = variant ? '-' + variant : '';
    const isInverse = inverse ? '-inverse' : '';
    return originalClass + ' ' + originalClass + isType + isVariant + isInverse;
  }
  render() {
    return (h(Host, { type: this.type, class: this.h.classes(LayoutClass.root) }, h("section", { class: this.typeClass(LayoutClass.section, this.type, this.variant, this.inverse) }, h("slot", null))));
  }
  static get is() { return "gov-layout"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-layout.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-layout.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LayoutType",
          "resolved": "\"aside\" | \"stretch\" | \"text\"",
          "references": {
            "LayoutType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-layout/constants.ts::LayoutType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Layout type"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'stretch'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "LayoutVariantType",
          "resolved": "\"left\" | \"right\"",
          "references": {
            "LayoutVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-layout/constants.ts::LayoutVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Layout align"
        },
        "attribute": "variant",
        "reflect": false
      },
      "inverse": {
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
          "text": "Determine if component should have inverse column order"
        },
        "attribute": "inverse",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-layout.js.map
