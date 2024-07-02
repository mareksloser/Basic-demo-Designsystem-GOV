import { h, Host } from "@stencil/core";
import { govHost } from "../../helpers/Dom/template";
import { CookiebarClass } from "./constants";
export class GovCookiebar {
  constructor() {
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(CookiebarClass.root) }, h("div", { class: CookiebarClass.holder }, h("div", { class: CookiebarClass.content }, h("slot", null)), (this.h.hasSlot('actions-primary') || this.h.hasSlot('actions-secondary')) && (h("div", { class: CookiebarClass.actions }, this.h.hasSlot('actions-primary') && (h("div", { class: CookiebarClass.actionsPrimary }, h("slot", { name: "actions-primary" }))), this.h.hasSlot('actions-secondary') && (h("div", { class: CookiebarClass.actionsSecondary }, h("slot", { name: "actions-secondary" }))))))));
  }
  static get is() { return "gov-cookiebar"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-cookiebar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-cookiebar.css"]
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-cookiebar.js.map
