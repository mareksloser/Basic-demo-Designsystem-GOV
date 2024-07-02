import { Host, h } from "@stencil/core";
import { EmptyClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovEmpty {
  constructor() {
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(EmptyClass.root) }, this.h.hasSlot('icon') && (h("div", { class: EmptyClass.icon }, h("slot", { name: "icon" }))), h("div", { class: EmptyClass.content }, h("slot", null))));
  }
  static get is() { return "gov-empty"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-empty.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-empty.css"]
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-empty.js.map
