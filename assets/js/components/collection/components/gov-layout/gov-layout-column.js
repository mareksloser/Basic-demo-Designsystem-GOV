import { h, Host } from "@stencil/core";
import { LayoutColumnClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovLayoutColumn {
  constructor() {
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(LayoutColumnClass.root) }, h("slot", null)));
  }
  static get is() { return "gov-layout-column"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-layout-column.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-layout-column.css"]
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-layout-column.js.map
