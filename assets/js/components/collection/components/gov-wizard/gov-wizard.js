import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { WizardSizes, WizardClass, WizardItemClass } from "./constants";
import { govHost } from "../../helpers/Dom/template";
import { validateWcagLabel } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
export class GovWizard {
  constructor() {
    this.size = "m";
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(WizardSizes, newValue, WizardClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
  }
  componentDidLoad() {
    this.host.querySelectorAll(WizardItemClass.root).forEach((child) => {
      child.setAttribute("size", this.size);
      /*
      child.addEventListener('gov-change', (e: GovWizardItemCustomEvent<GovWizardItemChangeEvent>) => {
        e.stopPropagation()
        this.govChange.emit(e.detail)
      })
      */
    });
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(WizardClass.root), role: "list", size: this.size }, h("slot", null)));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, WizardClass.root);
  }
  static get is() { return "gov-wizard"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-wizard.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-wizard.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WizardSizesType",
          "resolved": "\"m\" | \"s\" | \"xs\"",
          "references": {
            "WizardSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-wizard/constants.ts::WizardSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Size of wizard"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "\"m\""
      },
      "wcagLabel": {
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
          "tags": [],
          "text": "Adds accessible label for the wizard that is only shown for screen readers."
        },
        "attribute": "wcag-label",
        "reflect": false
      },
      "wcagLabelledBy": {
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
          "tags": [],
          "text": "String of id's that indicate alternative labels elements"
        },
        "attribute": "wcag-labelled-by",
        "reflect": false
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
          "text": "Called when the wizard children state changes"
        },
        "complexType": {
          "original": "GovWizardItemChangeEvent",
          "resolved": "GovWizardItemChangeEvent",
          "references": {
            "GovWizardItemChangeEvent": {
              "location": "import",
              "path": "./gov-wizard-item.d",
              "id": "../../../packages/core/src/components/gov-wizard/gov-wizard-item.d.tsx::GovWizardItemChangeEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "validateWcag": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Validate the WCAG attributes of the component",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "size",
        "methodName": "validateSize"
      }];
  }
}
//# sourceMappingURL=gov-wizard.js.map
