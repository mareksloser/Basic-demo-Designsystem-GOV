import { h, Host } from "@stencil/core";
import { TooltipContentClass, TooltipSize, TooltipVariant } from "./constants";
import { toBoolAttr } from "../../helpers/Dom/template";
export class GovTooltipContent {
  constructor() {
    this.variant = TooltipVariant.PRIMARY;
    this.size = TooltipSize._M;
    this.persist = false;
    this.isVisible = false;
    this.parentId = null;
  }
  visibleContent(newValue) {
    clearTimeout(this.timeout);
    if (newValue === false) {
      this.timeout = setTimeout(() => {
        this.host.style.visibility = "hidden";
      }, 250);
    }
    else {
      this.host.style.visibility = "visible";
    }
  }
  hideContent() {
    this.isVisible = false;
    this.persist = false;
    const parentEl = document.getElementById(this.parentId);
    if (parentEl) {
      parentEl.hide().catch();
    }
  }
  render() {
    return (h(Host, { class: TooltipContentClass.root, role: "tooltip", hidden: !this.isVisible, "aria-hidden": !toBoolAttr(this.isVisible), "is-visible": this.isVisible }, h("slot", null), this.persist ? (h("gov-button", { "on-gov-click": this.hideContent.bind(this), variant: this.variant, size: this.size, type: "base", inverse: this.variant === TooltipVariant.SECONDARY }, h("gov-icon", { slot: "left-icon", name: "x-lg", type: "basic" }))) : null));
  }
  static get is() { return "gov-tooltip-content"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tooltip-content.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tooltip-content.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TooltipVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "TooltipVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-tooltip/constants.tsx::TooltipVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the tooltip"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "TooltipVariant.PRIMARY"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TooltipSizeType",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "TooltipSizeType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-tooltip/constants.tsx::TooltipSizeType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Tooltip\u2019s size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "TooltipSize._M"
      },
      "persist": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Tooltip is still visible."
        },
        "attribute": "persist",
        "reflect": false,
        "defaultValue": "false"
      },
      "isVisible": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates display of tooltip content"
        },
        "attribute": "is-visible",
        "reflect": false,
        "defaultValue": "false"
      },
      "parentId": {
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
          "text": "Indicates display of tooltip content"
        },
        "attribute": "parent-id",
        "reflect": false,
        "defaultValue": "null"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "isVisible",
        "methodName": "visibleContent"
      }];
  }
}
//# sourceMappingURL=gov-tooltip-content.js.map
