import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { StepperClass, StepperItemClass, StepperSizes } from "./constants";
import { govHost } from "../../helpers/Dom/template";
export class GovStepper {
  constructor() {
    this.size = 'm';
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(StepperSizes, newValue, StepperClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
  }
  componentDidLoad() {
    this.host.querySelectorAll(StepperItemClass.root).forEach((child) => {
      child.setAttribute('size', this.size);
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit(e.detail);
      });
    });
  }
  render() {
    return (h(Host, { class: this.h.classes(StepperClass.root), role: "list", size: this.size }, h("slot", null)));
  }
  static get is() { return "gov-stepper"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-stepper.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-stepper.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "StepperSizesType",
          "resolved": "\"m\" | \"s\" | \"xs\"",
          "references": {
            "StepperSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-stepper/constants.ts::StepperSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Size of stepper"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      }
    };
  }
  static get events() {
    return [{
        "method": "govChange",
        "name": "gov-change",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when the Stepper state changes"
        },
        "complexType": {
          "original": "GovStepperItemChangeEvent",
          "resolved": "GovStepperItemChangeEvent",
          "references": {
            "GovStepperItemChangeEvent": {
              "location": "import",
              "path": "./gov-stepper-item.d",
              "id": "../../../packages/core/src/components/gov-stepper/gov-stepper-item.d.tsx::GovStepperItemChangeEvent"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "size",
        "methodName": "validateSize"
      }];
  }
}
//# sourceMappingURL=gov-stepper.js.map
