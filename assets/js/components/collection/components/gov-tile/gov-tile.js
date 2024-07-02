import { h, Host } from "@stencil/core";
import { TileClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovTile {
  constructor() {
    this.href = undefined;
    this.target = undefined;
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(TileClass.root) }, this.href ? (h("a", { href: this.href, target: this.target, class: TileClass.link, ref: el => (this.triggerRef = el) }, this.h.hasSlot("icon") && (h("span", { class: TileClass.icon }, h("slot", { name: "icon" }))), this.h.hasSlot("title") && (h("span", { class: TileClass.title }, h("slot", { name: "title" }), h("gov-icon", { class: TileClass.arrow, name: "chevron-right" }))), h("div", { class: TileClass.content }, h("slot", null)))) : (h("span", null, this.h.hasSlot("icon") && (h("span", { class: TileClass.icon }, h("slot", { name: "icon" }))), this.h.hasSlot("title") && (h("span", { class: TileClass.title }, h("slot", { name: "title" }))), h("div", { class: TileClass.content }, h("slot", null))))));
  }
  /**
   * Returns a clickable element instance
   */
  async getTriggerRef() {
    return this.triggerRef;
  }
  static get is() { return "gov-tile"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tile.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tile.css"]
    };
  }
  static get properties() {
    return {
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
          "tags": [],
          "text": "Link on whole tile"
        },
        "attribute": "href",
        "reflect": true
      },
      "target": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonTargetType",
          "resolved": "\"_blank\" | \"_new\" | \"_self\"",
          "references": {
            "ButtonTargetType": {
              "location": "import",
              "path": "../gov-button/button/constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::ButtonTargetType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "target",
        "reflect": false
      }
    };
  }
  static get methods() {
    return {
      "getTriggerRef": {
        "complexType": {
          "signature": "() => Promise<HTMLLinkElement | HTMLSpanElement>",
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
            "HTMLSpanElement": {
              "location": "global",
              "id": "global::HTMLSpanElement"
            }
          },
          "return": "Promise<HTMLLinkElement | HTMLSpanElement>"
        },
        "docs": {
          "text": "Returns a clickable element instance",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-tile.js.map
