import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { StatsBarClass, StatsBarIconPosition, StatsBarItemClass, StatsBarVariants, } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovStatsbar {
  constructor() {
    this.iconPosition = undefined;
    this.variant = StatsBarVariants.PRIMARY;
    this.h = govHost(this.host);
  }
  validateIconPosition(newValue) {
    validateProp(StatsBarIconPosition, newValue, StatsBarClass.root);
  }
  validateVariant(newValue) {
    validateProp(StatsBarVariants, newValue, StatsBarClass.root);
  }
  componentWillLoad() {
    this.validateIconPosition(this.iconPosition);
    this.validateVariant(this.variant);
  }
  componentDidLoad() {
    this.host.querySelectorAll(StatsBarItemClass.root).forEach((node) => {
      if (this.iconPosition === "left") {
        node.setAttribute("icon-position", "left");
      }
    });
  }
  render() {
    return (h(Host, { class: this.h.classes(StatsBarClass.root), variant: this.variant }, h("section", { class: StatsBarClass.section }, h("slot", null))));
  }
  static get is() { return "gov-statsbar"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-statsbar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-statsbar.css"]
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
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "StatsBarVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "StatsBarVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-statsbar/constants.tsx::StatsBarVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "StatsBarVariants.PRIMARY"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "iconPosition",
        "methodName": "validateIconPosition"
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-statsbar.js.map
