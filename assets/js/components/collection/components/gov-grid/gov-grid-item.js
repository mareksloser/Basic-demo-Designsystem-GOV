import { h, Host } from "@stencil/core";
import { GridItemClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovGridItem {
  constructor() {
    this.size = '12/12';
    this.sizeSm = undefined;
    this.sizeMd = undefined;
    this.sizeLg = undefined;
    this.sizeXl = undefined;
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(GridItemClass.root), role: "listitem", size: this.size, "size-sm": this.sizeSm, "size-md": this.sizeMd, "size-lg": this.sizeLg, "size-xl": this.sizeXl }, h("slot", null)));
  }
  static get is() { return "gov-grid-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-grid-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-grid-item.css"]
    };
  }
  static get properties() {
    return {
      "size": {
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
          "text": "Cell size as a fraction of 1/12 of the grid size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'12/12'"
      },
      "sizeSm": {
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
          "text": "Cell size for SM media query and up as a fraction of 12 of the grid size"
        },
        "attribute": "size-sm",
        "reflect": false
      },
      "sizeMd": {
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
          "text": "Cell size for MD media query and up as a fraction of 12 of the grid size"
        },
        "attribute": "size-md",
        "reflect": false
      },
      "sizeLg": {
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
          "text": "Cell size for LG media query and up as a fraction of 12 of the grid size"
        },
        "attribute": "size-lg",
        "reflect": false
      },
      "sizeXl": {
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
          "text": "Cell size for XL media query and up as a fraction of 12 of the grid size"
        },
        "attribute": "size-xl",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-grid-item.js.map
