import { h, Host } from "@stencil/core";
import { govErrorLog } from "../../helpers/Log/gov.log";
import { NavItemClass } from "./constants";
export class GovNavItem {
  constructor() {
    this.isExpandedState = undefined;
    this.href = undefined;
  }
  validateHref(newValue) {
    if (!newValue) {
      govErrorLog(`[${NavItemClass.root}]: Parameter href is required.`);
    }
  }
  componentWillLoad() {
    this.validateHref(this.href);
  }
  render() {
    return (h(Host, { class: NavItemClass.root, role: "listitem" }, h("a", { href: this.href, class: NavItemClass.link }, h("slot", null))));
  }
  static get is() { return "gov-nav-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-nav-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-nav-item.css"]
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "href",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isExpandedState": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "href",
        "methodName": "validateHref"
      }];
  }
}
//# sourceMappingURL=gov-nav-item.js.map
