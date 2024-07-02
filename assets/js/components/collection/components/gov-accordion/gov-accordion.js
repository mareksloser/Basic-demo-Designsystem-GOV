import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { AccordionClass, AccordionSizes, AccordionItemClass } from "./constants";
import { Variants } from "../../core/constants/variants";
import { validateWcagLabel } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
import { govHost } from "../../helpers/Dom/template";
export class GovAccordion {
  constructor() {
    this.size = 'm';
    this.variant = 'primary';
    this.noBorder = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(AccordionSizes, newValue, AccordionClass.root);
  }
  validateVariant(newValue) {
    validateProp(Variants, newValue, AccordionClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
    this.validateVariant(this.variant);
  }
  componentDidLoad() {
    this.host.querySelectorAll(AccordionItemClass.root).forEach((child) => {
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit({
          component: AccordionClass.root,
          open: e.detail.open,
          ref: e.detail.ref
        });
      });
    });
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(AccordionClass.root), size: this.size, variant: this.variant, role: 'list', "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, h("slot", null)));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, AccordionClass.root);
  }
  static get is() { return "gov-accordion"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-accordion.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-accordion.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AccordionSizeType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xs\"",
          "references": {
            "AccordionSizeType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-accordion/constants.ts::AccordionSizeType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Accordion\u2019s size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AccordionVariantType",
          "resolved": "\"custom\" | \"primary\" | \"secondary\"",
          "references": {
            "AccordionVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-accordion/constants.ts::AccordionVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the button."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "noBorder": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Accordion item underline"
        },
        "attribute": "no-border",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Adds accessible label for the accordion that is only shown for screen readers."
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
          "text": "Called when the accordion state changes"
        },
        "complexType": {
          "original": "AccordionEvent",
          "resolved": "AccordionEvent",
          "references": {
            "AccordionEvent": {
              "location": "import",
              "path": "./gov-accordion.types",
              "id": "../../../packages/core/src/components/gov-accordion/gov-accordion.types.ts::AccordionEvent"
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
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-accordion.js.map
