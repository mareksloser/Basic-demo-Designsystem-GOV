import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { TooltipClass, TooltipContentClass, TooltipPosition, TooltipSize, TooltipVariant, } from "./constants";
import { createID } from "../../utils/string.utils";
import { govHost } from "../../helpers/Dom/template";
export class GovTooltip {
  constructor() {
    this.tooltipContentId = undefined;
    this.tooltipId = undefined;
    this.variant = TooltipVariant.PRIMARY;
    this.size = TooltipSize._M;
    this.position = "right";
    this.message = undefined;
    this.identifier = undefined;
    this.icon = undefined;
    this.persist = false;
    this.h = govHost(this.host);
    this.tooltipId = createID("GovTooltip");
    this.tooltipContentId = createID("GovContentTooltip");
  }
  validateVariant(newValue) {
    validateProp(TooltipVariant, newValue, TooltipClass.root);
  }
  validateSize(newValue) {
    validateProp(TooltipSize, newValue, TooltipClass.root);
  }
  validatePosition(newValue) {
    validateProp(TooltipPosition, newValue, TooltipClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.validatePosition(this.position);
    this.createContentWrapper();
    this.registerListeners();
  }
  disconnectedCallback() {
    this.removeContent();
  }
  createContentWrapper() {
    var _a;
    const hasContentInside = this.host.querySelector(TooltipContentClass.root);
    if (hasContentInside) {
      this.content = hasContentInside;
    }
    else {
      this.content = document.createElement(TooltipContentClass.root);
      this.content.innerHTML = this.message;
      this.host.appendChild(this.content);
    }
    const trigger = this.host.getBoundingClientRect();
    this.content.style.left = trigger.left + 'px';
    this.content.style.top = trigger.top + 'px';
    this.content.style.visibility = 'hidden';
    this.content.setAttribute("id", (_a = this.identifier) !== null && _a !== void 0 ? _a : this.tooltipContentId);
    this.content.setAttribute("parent-id", this.tooltipId);
    this.content.setAttribute("variant", this.variant);
    this.content.setAttribute("size", this.size);
    document.body.appendChild(this.content);
  }
  registerListeners() {
    this.host.addEventListener("click", e => {
      e.preventDefault();
      this.persist = true;
      if (this.content) {
        this.content.setAttribute("persist", "true");
      }
      this.showTooltip();
    });
    this.host.addEventListener("focus", e => {
      e.preventDefault();
      this.showTooltip();
    });
    this.host.addEventListener("blur", e => {
      e.preventDefault();
      if (this.persist === false) {
        this.hideTooltip();
      }
    });
    this.host.addEventListener("mouseenter", e => {
      e.preventDefault();
      this.showTooltip();
    });
    this.host.addEventListener("mouseleave", e => {
      e.preventDefault();
      if (this.persist === false) {
        this.hideTooltip();
      }
    });
  }
  verifyPositionSpace() {
    const offset = 12;
    const windowWidth = window.innerWidth;
    const trigger = this.host.getBoundingClientRect();
    const trgWidth = this.host.offsetWidth;
    const trgHeight = this.host.offsetHeight;
    const contentWidth = this.content.offsetWidth;
    const contentHeight = this.content.offsetHeight;
    const triggerPos = {
      left: trigger.left + document.documentElement.scrollLeft,
      top: trigger.top + document.documentElement.scrollTop,
    };
    const isRightSpace = ((triggerPos.left + offset + trigger.width) + contentWidth) <= windowWidth;
    const isLeftSpace = triggerPos.left > contentWidth;
    // LEFT/RIGHT
    if (this.position === TooltipPosition.LEFT || this.position === TooltipPosition.RIGHT) {
      this.content.style.top = (triggerPos.top - ((contentHeight - trgHeight) / 2)) + "px";
      if (isRightSpace === false && isLeftSpace === false) {
        this.position = TooltipPosition.TOP;
        this.content.setAttribute("position", TooltipPosition.TOP);
      }
      if (isLeftSpace && isRightSpace === false && this.position === TooltipPosition.RIGHT) {
        this.position = TooltipPosition.LEFT;
      }
      if (isRightSpace && isLeftSpace === false && this.position === TooltipPosition.LEFT) {
        this.position = TooltipPosition.RIGHT;
      }
    }
    if (this.position === TooltipPosition.RIGHT) {
      this.content.setAttribute("position", TooltipPosition.RIGHT);
      this.content.style.left = (triggerPos.left + offset + trigger.width) + "px";
    }
    if (this.position === TooltipPosition.LEFT) {
      this.content.setAttribute("position", TooltipPosition.LEFT);
      this.content.style.left = (triggerPos.left - (contentWidth + offset)) + "px";
    }
    // LEFT/RIGHT FOR TOP/BOTTOM
    if (this.position === TooltipPosition.TOP || this.position === TooltipPosition.BOTTOM) {
      if (contentWidth > trgWidth) {
        let leftPosition = (triggerPos.left - ((contentWidth - trgWidth) / 2));
        const isNotLeftSpace = leftPosition < 0;
        const isNotRightSpace = (leftPosition + contentWidth) > windowWidth;
        if (isNotLeftSpace && isNotRightSpace) {
          this.content.style.width = "auto";
          this.content.style.left = offset + "px";
          this.content.style.right = offset + "px";
        }
        else {
          if (isNotLeftSpace) {
            leftPosition = offset;
          }
          if (isNotRightSpace) {
            leftPosition = leftPosition - ((windowWidth - (leftPosition + contentWidth + offset)) * -1);
          }
          this.content.style.left = leftPosition + "px";
        }
      }
      else {
        const leftPosition = (triggerPos.left + ((trgWidth - contentWidth) / 2));
        this.content.style.left = leftPosition + "px";
      }
    }
    if (this.position === TooltipPosition.TOP) {
      this.content.setAttribute("position", TooltipPosition.TOP);
      this.content.style.top = (triggerPos.top - (contentHeight + offset)) + "px";
    }
    if (this.position === TooltipPosition.BOTTOM) {
      this.content.setAttribute("position", TooltipPosition.BOTTOM);
      this.content.style.top = (triggerPos.top + (trgHeight + offset)) + "px";
    }
    this.content.setAttribute("is-visible", "true");
    this.content.style.opacity = '1';
  }
  showTooltip() {
    if (this.content) {
      this.content.style.opacity = '0';
      this.content.hidden = false;
      this.verifyPositionSpace();
    }
  }
  hideTooltip() {
    if (this.content) {
      this.content.setAttribute("is-visible", "false");
      this.content.setAttribute("persist", "false");
    }
  }
  removeContent() {
    const contentEl = document.getElementById(this.tooltipContentId);
    if (contentEl) {
      contentEl.remove();
    }
  }
  render() {
    var _a;
    return (h(Host, { id: this.tooltipId, class: this.h.classes(TooltipClass.root), position: this.position, tabindex: 0, "aria-describedby": (_a = this.identifier) !== null && _a !== void 0 ? _a : this.tooltipContentId }, h("slot", null)));
  }
  /**
   * Showing the modal
   */
  async show() {
    this.showTooltip();
  }
  /**
   * Hiding the modal
   */
  async hide() {
    this.persist = false;
    this.hideTooltip();
  }
  static get is() { return "gov-tooltip"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tooltip.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tooltip.css"]
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
      "position": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "TooltipPositionType",
          "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
          "references": {
            "TooltipPositionType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-tooltip/constants.tsx::TooltipPositionType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tooltip display position"
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "\"right\""
      },
      "message": {
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
          "text": "Information contained in the tooltip"
        },
        "attribute": "message",
        "reflect": false,
        "defaultValue": "undefined"
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
          "text": "Custom tooltip identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "icon": {
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
          "text": "Trigger is just an icon"
        },
        "attribute": "icon",
        "reflect": true,
        "defaultValue": "undefined"
      }
    };
  }
  static get states() {
    return {
      "persist": {}
    };
  }
  static get methods() {
    return {
      "show": {
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
          "text": "Showing the modal",
          "tags": []
        }
      },
      "hide": {
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
          "text": "Hiding the modal",
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
      }, {
        "propName": "position",
        "methodName": "validatePosition"
      }];
  }
}
//# sourceMappingURL=gov-tooltip.js.map
