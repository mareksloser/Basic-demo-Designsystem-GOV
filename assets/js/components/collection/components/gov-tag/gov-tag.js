import { h, Host } from "@stencil/core";
import { govHost } from "../../helpers/Dom/template";
import { validateProp } from "../../helpers/Validate/props";
import { ButtonSizes, ButtonVariants } from "../gov-button/button/constants";
import { TagClass } from "./constants";
import { prepareIconFormat } from "../gov-icon/helpers";
export class GovTag {
  constructor() {
    this.inverse = false;
    this.iconLeft = undefined;
    this.iconRight = undefined;
    this.size = ButtonSizes._S;
    this.variant = ButtonVariants.PRIMARY;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(ButtonVariants, newValue, TagClass.root);
  }
  validateSize(newValue) {
    validateProp(ButtonSizes, newValue, TagClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
  }
  render() {
    const iconLeft = prepareIconFormat(this.iconLeft);
    const iconRight = prepareIconFormat(this.iconRight);
    return (h(Host, { class: this.h.classes(TagClass.root), variant: this.variant, type: this.inverse ? undefined : 'solid', size: this.size, inverse: this.inverse }, h("span", { class: "element" }, this.h.hasSlot('left-icon') && h("slot", { name: "left-icon" }), iconLeft && h("gov-icon", { type: iconLeft.type, name: iconLeft.name }), h("slot", null), iconRight && h("gov-icon", { type: iconRight.type, name: iconRight.name }), this.h.hasSlot('right-icon') && h("slot", { name: "right-icon" }))));
  }
  static get is() { return "gov-tag"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tag.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tag.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Determine if component should have inverse colors to be used on dark background"
        },
        "attribute": "inverse",
        "reflect": false,
        "defaultValue": "false"
      },
      "iconLeft": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Definition of the button icon on the left. The icon must be defined in the form \"type/name\"."
        },
        "attribute": "icon-left",
        "reflect": false
      },
      "iconRight": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Definition of the button icon on the left. The icon must be defined in the form \"type/name\"."
        },
        "attribute": "icon-right",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonSizesType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
          "references": {
            "ButtonSizesType": {
              "location": "import",
              "path": "../gov-button/button/constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::ButtonSizesType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tag\u2019s size."
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "ButtonSizes._S"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonVariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "ButtonVariantType": {
              "location": "import",
              "path": "../gov-button/button/constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::ButtonVariantType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variation of the tag."
        },
        "attribute": "variant",
        "reflect": true,
        "defaultValue": "ButtonVariants.PRIMARY"
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
      }];
  }
}
//# sourceMappingURL=gov-tag.js.map
