import { h, Host } from "@stencil/core";
import { GridClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovGrid {
  constructor() {
    this.alignX = undefined;
    this.alignY = undefined;
    this.h = govHost(this.host);
  }
  // vertical / horizontal align
  render() {
    return (h(Host, { class: this.h.classes(GridClass.root), "align-x": this.alignX, "align-y": this.alignY, role: "list" }, h("slot", null)));
  }
  static get is() { return "gov-grid"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-grid.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-grid.css"]
    };
  }
  static get properties() {
    return {
      "alignX": {
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
          "text": "Horizontal align of cells"
        },
        "attribute": "align-x",
        "reflect": false
      },
      "alignY": {
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
          "text": "Vertical align of cells"
        },
        "attribute": "align-y",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-grid.js.map
