import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { AccordionClass, AccordionItemClass, AccordionSizes, AccordionVariants, } from "./constants";
import { createID } from "../../utils/string.utils";
import { booleanString, govHost, toBoolAttrIfDefined } from "../../helpers/Dom/template";
export class GovAccordionItem {
  constructor() {
    this.isExpandedState = undefined;
    this.variant = undefined;
    this.identifier = undefined;
    this.size = undefined;
    this.disabled = false;
    this.isExpanded = false;
    this.h = govHost(this.host);
    this.triggerId = createID("GovAccordionItem");
    this.contentId = createID("GovAccordionContent");
  }
  validateSize(newValue) {
    validateProp(AccordionSizes, newValue, AccordionItemClass.root);
  }
  validateVariant(newValue) {
    validateProp(AccordionVariants, newValue, AccordionItemClass.root);
  }
  emmitChange() {
    this.govChange.emit({
      open: this.isExpanded,
      component: AccordionItemClass.root,
      ref: this.host,
    });
  }
  componentWillLoad() {
    this.getPropsFromParents();
    this.validateSize(this.size);
    this.validateVariant(this.variant);
  }
  getPropsFromParents() {
    const accordion = this.h.getParent(AccordionClass.root);
    if (accordion) {
      this.size = accordion.getAttribute("size");
      this.variant = accordion.getAttribute("variant");
    }
  }
  render() {
    const triggerId = this.identifier || this.triggerId;
    const contentId = this.contentId;
    return (h(Host, { class: this.h.classes(AccordionItemClass.root), size: this.size, variant: this.variant, role: "listitem" }, h("button", { id: triggerId, class: AccordionItemClass.header, "aria-expanded": booleanString(this.isExpanded), "aria-controls": contentId, disabled: this.disabled, type: "button", "aria-disabled": toBoolAttrIfDefined(this.disabled), onClick: (e) => {
        e.stopPropagation();
        this.toggle().finally();
      } }, this.h.hasSlot("icon") && (h("span", { class: AccordionItemClass.icon }, h("slot", { name: "icon" }))), h("span", { class: AccordionItemClass.title }, h("span", { class: AccordionItemClass.label }, h("slot", { name: "label" })), this.h.hasSlot("annotation") && (h("span", { class: AccordionItemClass.annotation }, h("slot", { name: "annotation" })))), h("span", { class: AccordionItemClass.right }, this.h.hasSlot("suffix") && (h("span", { class: AccordionItemClass.suffix }, h("slot", { name: "suffix" }))), h("span", { class: AccordionItemClass.arrow }, this.h.hasSlot("toggle-icon") ? (h("slot", { name: "toggle-icon" })) : (h("gov-icon", { name: "chevron-down" }))))), h("div", { class: AccordionItemClass.content, id: contentId, "aria-hidden": booleanString(!this.isExpanded), hidden: !this.isExpanded, "aria-labelledby": triggerId }, h("slot", null))));
  }
  /**
   * Opening the accordion
   */
  async open() {
    this.isExpanded = true;
    this.emmitChange();
  }
  /**
   * Closing the accordion
   */
  async close() {
    this.isExpanded = false;
    this.emmitChange();
  }
  /**
   * Accordion switch
   */
  async toggle() {
    this.isExpanded = !this.isExpanded;
    this.emmitChange();
  }
  /**
   * Returns the current state of the component
   */
  async currentState() {
    return this.isExpanded;
  }
  static get is() { return "gov-accordion-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-accordion-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-accordion-item.css"]
    };
  }
  static get properties() {
    return {
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
        "reflect": false
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
          "text": "Custom accordion item identifier. Otherwise, it will be generated"
        },
        "attribute": "identifier",
        "reflect": false
      },
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
        "reflect": false
      },
      "disabled": {
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
          "text": "Makes the button component disabled.\nThis prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "isExpanded": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines whether the accordion is open or closed by button"
        },
        "attribute": "is-expanded",
        "reflect": false,
        "defaultValue": "false"
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
          "original": "AccordionItemEvent",
          "resolved": "AccordionItemEvent",
          "references": {
            "AccordionItemEvent": {
              "location": "import",
              "path": "./gov-accordion.types",
              "id": "../../../packages/core/src/components/gov-accordion/gov-accordion.types.ts::AccordionItemEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "open": {
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
          "text": "Opening the accordion",
          "tags": []
        }
      },
      "close": {
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
          "text": "Closing the accordion",
          "tags": []
        }
      },
      "toggle": {
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
          "text": "Accordion switch",
          "tags": []
        }
      },
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
        "propName": "size",
        "methodName": "validateSize"
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-accordion-item.js.map
