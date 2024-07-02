import { h, Host } from "@stencil/core";
import { FormMessageClass, FormMessageVariants } from "./constants";
import { govHost } from "../../../helpers/Dom/template";
import { validateProp } from "../../../helpers/Validate/props";
import { createID } from "../../../utils/string.utils";
export class GovFormMessage {
  constructor() {
    this.variant = 'secondary';
    this.h = govHost(this.host);
    this.messageId = createID('GovFormMessage');
  }
  validateVariant(newValue) {
    validateProp(FormMessageVariants, newValue, FormMessageClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
  }
  render() {
    return (h(Host, { class: this.h.classes(FormMessageClass.root), variant: this.variant }, this.h.hasSlot('icon') && (h("span", { class: FormMessageClass.icon }, h("slot", { name: "icon" }))), h("span", { id: this.messageId, class: FormMessageClass.content }, h("slot", null))));
  }
  /**
   * Returns unique identfiier of message
   */
  async identifier() {
    return this.messageId;
  }
  static get is() { return "gov-form-message"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-message.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-message.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormMessageVariantType",
          "resolved": "\"error\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "FormMessageVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/message/constants.ts::FormMessageVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the message."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'secondary'"
      }
    };
  }
  static get methods() {
    return {
      "identifier": {
        "complexType": {
          "signature": "() => Promise<string>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Returns unique identfiier of message",
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
      }];
  }
}
//# sourceMappingURL=gov-form-message.js.map
