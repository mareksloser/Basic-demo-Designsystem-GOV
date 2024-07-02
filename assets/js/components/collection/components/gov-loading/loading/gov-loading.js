import { h, Host } from "@stencil/core";
import { LoadingClass } from "./constants";
import { govHost, prepareClasses } from "../../../helpers/Dom/template";
export class GovLoading {
  constructor() {
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(LoadingClass.root) }, h("div", { class: LoadingClass.content }, h("gov-icon", { class: prepareClasses([LoadingClass.icon, "gov-spin-animation"]), name: "loader" }), h("slot", null)), h("gov-backdrop", { inverse: true })));
  }
  static get is() { return "gov-loading"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-loading.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-loading.css"]
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-loading.js.map
