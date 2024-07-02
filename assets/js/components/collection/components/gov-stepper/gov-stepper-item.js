import { h, Host } from "@stencil/core";
import { govErrorLog } from "../../helpers/Log/gov.log";
import { validateProp } from "../../helpers/Validate/props";
import { StepperItemClass, StepperVariants } from "./constants";
import { createID } from "../../utils/string.utils";
import { govHost, prepareClasses } from "../../helpers/Dom/template";
export class GovStepperItem {
  constructor() {
    this.isExpandedState = undefined;
    this.variant = 'primary';
    this.size = 'm';
    this.identifier = undefined;
    this.label = undefined;
    this.annotation = undefined;
    this.triggerTag = 'h3';
    this.h = govHost(this.host);
    this.triggerId = createID('GovStepperItem');
    this.contentId = createID('GovStepperContent');
  }
  validateLabel(newValue) {
    if (!newValue) {
      govErrorLog(`[${StepperItemClass.root}]: Parameter label is required.`);
    }
  }
  validateTriggerTag(newValue) {
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        govErrorLog(`[${StepperItemClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  validateVariant(newValue) {
    validateProp(StepperVariants, newValue, StepperItemClass.root);
  }
  componentWillLoad() {
    this.validateLabel(this.label);
    this.validateVariant(this.variant);
    this.validateTriggerTag(this.triggerTag);
  }
  render() {
    const triggerId = this.identifier || this.triggerId;
    const contentId = this.contentId;
    const { label } = this;
    const TriggerTag = this.triggerTag;
    return (h(Host, { class: prepareClasses([StepperItemClass.root, this.annotation && StepperItemClass.rootWithAnnot]), variant: this.variant }, h("div", { id: triggerId, class: StepperItemClass.header, role: "listitem" }, h(TriggerTag, { class: StepperItemClass.title }, this.h.hasSlot('prefix') && (h("span", { class: StepperItemClass.prefix }, h("slot", { name: "prefix" }))), h("span", { class: StepperItemClass.name }, h("span", { class: StepperItemClass.label }, label), this.annotation && h("span", { class: StepperItemClass.annot }, this.annotation)))), this.h.hasSlot('content') && (h("div", { class: StepperItemClass.content, id: contentId, "aria-labelledby": triggerId, role: "tabpanel" }, h("slot", { name: "content" })))));
  }
  /**
   * Returns the current state of the component
   */
  async currentState() {
    return this.isExpandedState;
  }
  static get is() { return "gov-stepper-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-stepper-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-stepper-item.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "StepperVariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "StepperVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-stepper/constants.ts::StepperVariantType"
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
      },
      "identifier": {
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
          "text": "Custom stepper item identifier. Otherwise, it will be generated"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "label": {
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
          "text": "Item name of the stepper"
        },
        "attribute": "label",
        "reflect": false
      },
      "annotation": {
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
          "text": "Item annotation of the stepper"
        },
        "attribute": "annotation",
        "reflect": false
      },
      "triggerTag": {
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
          "text": "Used to change the HMTL tag in the stepper trigger for correct semantic structure"
        },
        "attribute": "trigger-tag",
        "reflect": false,
        "defaultValue": "'h3'"
      }
    };
  }
  static get states() {
    return {
      "isExpandedState": {}
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
  static get methods() {
    return {
      "currentState": {
        "complexType": {
          "signature": "() => Promise<boolean>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<boolean>"
        },
        "docs": {
          "text": "Returns the current state of the component",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "label",
        "methodName": "validateLabel"
      }, {
        "propName": "triggerTag",
        "methodName": "validateTriggerTag"
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-stepper-item.js.map
