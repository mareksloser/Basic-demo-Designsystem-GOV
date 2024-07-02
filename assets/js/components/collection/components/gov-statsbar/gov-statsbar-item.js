import { h, Host } from "@stencil/core";
import { govHost } from "../../helpers/Dom/template";
import { validateProp } from "../../helpers/Validate/props";
import { StatsBarItemClass, StatsBarIconPosition } from "./constants";
export class GovStatsbarItem {
  constructor() {
    this.iconPosition = undefined;
    this.h = govHost(this.host);
  }
  validateIconPosition(newValue) {
    validateProp(StatsBarIconPosition, newValue, StatsBarItemClass.root);
  }
  componentWillLoad() {
    this.validateIconPosition(this.iconPosition);
  }
  render() {
    return (h(Host, { class: this.h.classes(StatsBarItemClass.root) }, h("article", null, this.h.hasSlot('icon') && (h("span", { class: StatsBarItemClass.icon }, h("slot", { name: "icon" }))), h("p", { class: StatsBarItemClass.number }, h("slot", null)), this.h.hasSlot('text') && (h("div", { class: StatsBarItemClass.text }, h("slot", { name: "text" }))))));
  }
  static get is() { return "gov-statsbar-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-statsbar-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-statsbar-item.css"]
    };
  }
  static get properties() {
    return {
      "iconPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "StatsBarIconPositionType",
          "resolved": "\"left\"",
          "references": {
            "StatsBarIconPositionType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-statsbar/constants.tsx::StatsBarIconPositionType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Icon\u2019s position"
        },
        "attribute": "icon-position",
        "reflect": false,
        "defaultValue": "undefined"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "iconPosition",
        "methodName": "validateIconPosition"
      }];
  }
}
//# sourceMappingURL=gov-statsbar-item.js.map
