import { h, Host } from "@stencil/core";
import { ErrorCodeClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovErrorCode {
  constructor() {
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(ErrorCodeClass.root) }, h("div", { class: ErrorCodeClass.holder }, this.h.hasSlot('icon') && (h("div", { class: ErrorCodeClass.icon }, h("slot", { name: "icon" }))), h("div", { class: ErrorCodeClass.content }, h("slot", null)))));
  }
  static get is() { return "gov-error-code"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-error-code.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-error-code.css"]
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-error-code.js.map
