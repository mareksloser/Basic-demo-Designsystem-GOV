import { h, Host } from "@stencil/core";
import { TilesClass } from "./constants";
import { prepareClasses } from "../../../helpers/Dom/template";
import { govHost } from "../../../helpers/Dom/template";
export class GovTiles {
  constructor() {
    this.columns = 3;
    this.noBorder = false;
    this.h = govHost(this.host);
  }
  get classNames() {
    return prepareClasses([TilesClass.root, this.columns && TilesClass.root + '--x' + this.columns]);
  }
  render() {
    return (h(Host, { class: this.h.classes(this.classNames) }, h("slot", null)));
  }
  static get is() { return "gov-tiles"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tiles.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tiles.css"]
    };
  }
  static get properties() {
    return {
      "columns": {
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
          "text": "Number of columns between 1-4"
        },
        "attribute": "columns",
        "reflect": false,
        "defaultValue": "3"
      },
      "noBorder": {
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
          "text": "Tiles border"
        },
        "attribute": "no-border",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-tiles.js.map
