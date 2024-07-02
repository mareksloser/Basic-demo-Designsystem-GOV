import { h, Host } from "@stencil/core";
import { FormGroupClass, FormGroupOrientation, FormGroupSizes } from "./constants";
import { govHost } from "../../../helpers/Dom/template";
import { validateProp } from "../../../helpers/Validate/props";
export class GovFormGroup {
  constructor() {
    this.gap = undefined;
    this.orientation = 'vertical';
    this.h = govHost(this.host);
  }
  validateGap(newValue) {
    if (newValue) {
      validateProp(FormGroupSizes, newValue, FormGroupClass.root);
    }
  }
  validateOrientation(newValue) {
    if (newValue) {
      validateProp(FormGroupOrientation, newValue, FormGroupClass.root);
    }
  }
  componentWillLoad() {
    this.validateGap(this.gap);
    this.validateOrientation(this.orientation);
  }
  render() {
    return (h(Host, { gap: this.gap, class: this.h.classes(FormGroupClass.root) }, h("slot", null)));
  }
  static get is() { return "gov-form-group"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-group.css"]
    };
  }
  static get properties() {
    return {
      "gap": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormGroupSizesType",
          "resolved": "\"2xs\" | \"l\" | \"m\" | \"s\" | \"xs\"",
          "references": {
            "FormGroupSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/group/constants.ts::FormGroupSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Gap's size."
        },
        "attribute": "gap",
        "reflect": false,
        "defaultValue": "undefined"
      },
      "orientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FormGroupOrientationType",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {
            "FormGroupOrientationType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-form/group/constants.ts::FormGroupOrientationType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Elements orientation"
        },
        "attribute": "orientation",
        "reflect": false,
        "defaultValue": "'vertical'"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "gap",
        "methodName": "validateGap"
      }, {
        "propName": "orientation",
        "methodName": "validateOrientation"
      }];
  }
}
//# sourceMappingURL=gov-form-group.js.map
