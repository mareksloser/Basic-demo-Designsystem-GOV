import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { govHost, toBoolAttr } from "../../helpers/Dom/template";
import { ChipClass, NativeType } from "./constants";
import { ButtonSizes, ButtonVariants } from "../gov-button/button/constants";
import { createID } from "../../utils/string.utils";
import { prepareIconFormat } from "../gov-icon/helpers";
export class GovChip {
  constructor() {
    this.inverse = false;
    this.disabled = false;
    this.href = undefined;
    this.target = undefined;
    this.iconLeft = undefined;
    this.iconRight = undefined;
    this.size = ButtonSizes._M;
    this.tag = "span";
    this.variant = ButtonVariants.PRIMARY;
    this.focusable = true;
    this.identifier = undefined;
    this.wcagLabel = undefined;
    this.wcagControls = undefined;
    this.wcagSelected = undefined;
    this.h = govHost(this.host);
    this.chipId = createID('GovChip');
  }
  validateVariant(newValue) {
    validateProp(ButtonVariants, newValue, ChipClass.root);
  }
  validateSize(newValue) {
    validateProp(ButtonSizes, newValue, ChipClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
  }
  render() {
    const Tag = this.href ? NativeType.A : this.tag;
    const nativeType = Tag == NativeType.BUTTON ? NativeType.BUTTON : undefined;
    const iconLeft = prepareIconFormat(this.iconLeft);
    const iconRight = prepareIconFormat(this.iconRight);
    return (h(Host, { class: this.h.classes([
        ChipClass.root,
        this.h.hasSlot("right") ? ChipClass.hasRight : undefined,
        this.h.hasSlot("left") ? ChipClass.hasLeft : undefined,
      ]), disabled: this.disabled, href: this.href, variant: this.variant, type: this.inverse ? undefined : "solid", size: this.size, inverse: this.inverse, hoverable: Tag == NativeType.A || Tag == NativeType.BUTTON }, h(Tag, { class: "element", href: this.href, target: this.target, "aria-label": this.wcagLabel, ref: el => (this.triggerRef = el), onClick: this.onClickHandler.bind(this), "aria-controls": this.wcagControls, "aria-selected": toBoolAttr(this.wcagSelected), tabindex: this.focusable ? "0" : "-1", id: this.identifier || this.chipId, type: nativeType }, this.h.hasSlot("left") && h("slot", { name: "left" }), this.h.hasSlot("left-icon") && h("slot", { name: "left-icon" }), iconLeft && h("gov-icon", { type: iconLeft.type, name: iconLeft.name }), h("slot", null), this.h.hasSlot("right-icon") && h("slot", { name: "right-icon" }), this.h.hasSlot("right") && h("slot", { name: "right" }), iconRight && h("gov-icon", { type: iconRight.type, name: iconRight.name }))));
  }
  onClickHandler(e) {
    e.stopPropagation();
    if (this.disabled === false && this.tag === NativeType.BUTTON) {
      this.govClick.emit(e);
    }
  }
  /**
   * Returns a clickable element instance
   */
  async getTriggerRef() {
    return this.triggerRef;
  }
  /**
   * Returns a unique tab trigger identifier
   */
  async getTriggerIdentifier() {
    return this.identifier || this.chipId;
  }
  /**
   * Focus button element
   */
  async setFocus() {
    this.triggerRef.focus();
  }
  static get is() { return "gov-chip"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-chip.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-chip.css"]
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
          "text": "Makes the chip component disabled.\nThis prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "href": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "href",
        "reflect": false
      },
      "target": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "target",
        "reflect": false
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
          "text": "Chip\u2019s size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "ButtonSizes._M"
      },
      "tag": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "NativeTypesType",
          "resolved": "\"a\" | \"button\" | \"span\"",
          "references": {
            "NativeTypesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-chip/constants.ts::NativeTypesType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to change the HTML tag in the chip"
        },
        "attribute": "tag",
        "reflect": false,
        "defaultValue": "\"span\""
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
          "text": "Style variation of the chip."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "ButtonVariants.PRIMARY"
      },
      "focusable": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/focusable"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "focusable",
        "reflect": false,
        "defaultValue": "true"
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
          "text": "Custom chip identifier. Otherwise, it will be generated"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "wcagLabel": {
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
          "text": "Adds accessible label for the button that is only shown for screen readers.\nTypically, this label text replaces the visible text on the button for users who use assistive technology."
        },
        "attribute": "wcag-label",
        "reflect": false
      },
      "wcagControls": {
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
          "text": "Use this property to add an aria-controls attribute to the button. Use the attribute to point to the unique id of the content that the button manages"
        },
        "attribute": "wcag-controls",
        "reflect": false
      },
      "wcagSelected": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "wcag-selected",
        "reflect": false
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
          "text": "Emitted when the button click."
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
  static get methods() {
    return {
      "getTriggerRef": {
        "complexType": {
          "signature": "() => Promise<HTMLLinkElement | HTMLButtonElement | HTMLSpanElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLLinkElement": {
              "location": "global",
              "id": "global::HTMLLinkElement"
            },
            "HTMLButtonElement": {
              "location": "global",
              "id": "global::HTMLButtonElement"
            },
            "HTMLSpanElement": {
              "location": "global",
              "id": "global::HTMLSpanElement"
            }
          },
          "return": "Promise<HTMLLinkElement | HTMLButtonElement | HTMLSpanElement>"
        },
        "docs": {
          "text": "Returns a clickable element instance",
          "tags": []
        }
      },
      "getTriggerIdentifier": {
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
          "text": "Returns a unique tab trigger identifier",
          "tags": []
        }
      },
      "setFocus": {
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
          "text": "Focus button element",
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
      }];
  }
}
//# sourceMappingURL=gov-chip.js.map
