import { h, Host } from "@stencil/core";
import { Variants } from "../../core/constants/variants";
import { govHost } from "../../helpers/Dom/template";
import { validateProp } from "../../helpers/Validate/props";
import { ControlGroupClass } from "./constants";
export class GovControlGroup {
  constructor() {
    this.variant = Variants.PRIMARY;
    this.noBorder = false;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(Variants, newValue, ControlGroupClass.root);
  }
  render() {
    const noBorder = this.noBorder === true ? "no-border" : undefined;
    return (h(Host, { class: this.h.classes([ControlGroupClass.root, noBorder]), variant: this.variant }, h("slot", null)));
  }
  static get is() { return "gov-control-group"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-control-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-control-group.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ControlGroupVariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "ControlGroupVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-control-group/constants.ts::ControlGroupVariantType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variation of the content message."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "Variants.PRIMARY"
      },
      "noBorder": {
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
          "text": "Specifies the display of the border between elements"
        },
        "attribute": "no-border",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-control-group.js.map
