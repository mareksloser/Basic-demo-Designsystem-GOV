import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { MessageClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
import { Variants } from "../../core/constants/variants";
export class GovMessage {
  constructor() {
    this.variant = Variants.PRIMARY;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(Variants, newValue, MessageClass.root);
  }
  render() {
    return (h(Host, { class: this.h.classes(MessageClass.root), variant: this.variant, role: "alert" }, this.h.hasSlot("icon") && (h("span", { class: MessageClass.icon }, h("slot", { name: "icon" }))), h("div", { class: MessageClass.content }, h("slot", null))));
  }
  static get is() { return "gov-message"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-message.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-message.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MessageVariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "MessageVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-message/constants.ts::MessageVariantType"
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
//# sourceMappingURL=gov-message.js.map
