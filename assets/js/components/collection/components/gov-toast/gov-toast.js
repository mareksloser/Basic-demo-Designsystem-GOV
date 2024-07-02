import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { ToastClass, ToastVariants } from "./constants";
import { govHost } from "../../helpers/Dom/template";
import { createID } from "../../utils/string.utils";
export class GovToast {
  constructor() {
    this.variant = "primary";
    this.gravity = "top";
    this.position = "right";
    this.type = "classic";
    this.time = 0;
    this.closeLabel = undefined;
    this.wcagCloseLabel = undefined;
    this.h = govHost(this.host);
    this.toastId = createID("GovToast");
  }
  validateVariant(newValue) {
    validateProp(ToastVariants, newValue, ToastClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.runTimer();
  }
  disconnectedCallback() {
    clearTimeout(this.timeout);
  }
  runTimer() {
    if (this.isSolid) {
      this.host.classList.add("is-initialized");
    }
    if (this.isTimer) {
      this.timeout = setTimeout(() => {
        this.host.classList.add(ToastClass.hidden);
        setTimeout(() => {
          this.destroy().catch();
          this.govClose.emit(this.toastId);
        }, 600);
      }, this.time);
    }
  }
  render() {
    return (h(Host, { class: this.h.classes([ToastClass.root, "gov-box-shadow--m"]), "data-toast-id": this.toastId, gravity: this.gravity, position: this.position, variant: this.variant, type: this.type, style: { "--toast-duration": this.time + "ms" } }, this.h.hasSlot("icon") && (h("span", { class: ToastClass.icon }, h("slot", { name: "icon" }))), h("div", { class: ToastClass.content, "aria-live": "polite", role: "status" }, h("slot", null)), h("div", { class: ToastClass.close }, h("gov-button", { size: "s", "wcag-label": this.wcagCloseLabel, variant: this.isSolid ? this.variant : "secondary", inverse: this.isSolid, type: "base", "on-gov-click": this.onCloseHandler.bind(this) }, this.closeLabel ? this.closeLabel : h("gov-icon", { name: "x-lg" }))), h("div", { class: ToastClass.timer })));
  }
  onCloseHandler() {
    this.destroy()
      .then(() => this.govClose.emit(this.toastId))
      .catch();
  }
  get isSolid() {
    return this.type === "solid";
  }
  get isTimer() {
    return Number.isInteger(this.time) && this.time > 0;
  }
  /**
   * Remove toast from dom
   */
  async destroy() {
    clearTimeout(this.timeout);
    const toast = document.querySelector(`[data-toast-id="${this.toastId}"]`);
    if (toast) {
      toast.classList.add(ToastClass.hidden);
      if (typeof toast.remove === "function") {
        toast.remove();
      }
    }
  }
  static get is() { return "gov-toast"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-toast.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-toast.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ToastVariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "ToastVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-toast/constants.ts::ToastVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the toast message."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "\"primary\""
      },
      "gravity": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"top\" | \"bottom\"",
          "resolved": "\"bottom\" | \"top\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Toast\u2019s gravity"
        },
        "attribute": "gravity",
        "reflect": false,
        "defaultValue": "\"top\""
      },
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"left\" | \"center\" | \"right\"",
          "resolved": "\"center\" | \"left\" | \"right\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Toast\u2019s position"
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "\"right\""
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ToastTypesType",
          "resolved": "\"classic\" | \"solid\"",
          "references": {
            "ToastTypesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-toast/constants.ts::ToastTypesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Toast type"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "\"classic\""
      },
      "time": {
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
          "text": "Number of milliseconds to wait before Toast disappear"
        },
        "attribute": "time",
        "reflect": false,
        "defaultValue": "0"
      },
      "closeLabel": {
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
          "text": "Closing button texting instead of icons"
        },
        "attribute": "close-label",
        "reflect": false
      },
      "wcagCloseLabel": {
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
          "text": "Aria label for the closing button. It is mandatory if the alert is closable"
        },
        "attribute": "wcag-close-label",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "govClose",
        "name": "gov-close",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when the close button is clicked"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "destroy": {
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
          "text": "Remove toast from dom",
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
//# sourceMappingURL=gov-toast.js.map
