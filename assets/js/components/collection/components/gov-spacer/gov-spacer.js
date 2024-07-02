import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { SpacerBreakpoints, SpacerClass, SpacerSize } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovSpacer {
  constructor() {
    this.size = undefined;
    this.breakpoint = undefined;
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(SpacerSize, newValue, SpacerClass.root);
  }
  validateBreakpoint(newValue) {
    validateProp(SpacerBreakpoints, newValue, SpacerClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
    this.validateBreakpoint(this.breakpoint);
  }
  render() {
    return h(Host, { class: this.h.classes(SpacerClass.root), size: this.size, breakpoint: this.breakpoint });
  }
  static get is() { return "gov-spacer"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-spacer.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-spacer.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SpacerSizeType",
          "resolved": "\"2xl\" | \"2xs\" | \"3xl\" | \"4xl\" | \"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
          "references": {
            "SpacerSizeType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-spacer/constants.tsx::SpacerSizeType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Spacer\u2019s size"
        },
        "attribute": "size",
        "reflect": false
      },
      "breakpoint": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SpacerBreakpointsType",
          "resolved": "\"lg\" | \"md\" | \"none\" | \"sm\" | \"xl\"",
          "references": {
            "SpacerBreakpointsType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-spacer/constants.tsx::SpacerBreakpointsType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Breakpoint"
        },
        "attribute": "breakpoint",
        "reflect": false,
        "defaultValue": "undefined"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "size",
        "methodName": "validateSize"
      }, {
        "propName": "breakpoint",
        "methodName": "validateBreakpoint"
      }];
  }
}
//# sourceMappingURL=gov-spacer.js.map
