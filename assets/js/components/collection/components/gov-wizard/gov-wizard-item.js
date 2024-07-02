import { h, Host } from "@stencil/core";
import { govErrorLog } from "../../helpers/Log/gov.log";
import { validateProp } from "../../helpers/Validate/props";
import { WizardVariants, WizardItemClass } from "./constants";
import { createID } from "../../utils/string.utils";
import { booleanString, govHost, toBoolAttrIfDefined } from "../../helpers/Dom/template";
import Fragment from "../../helpers/Fragment";
var Tags;
(function (Tags) {
  Tags["DIV"] = "div";
  Tags["BUTTON"] = "button";
})(Tags || (Tags = {}));
export class GovWizardItem {
  constructor() {
    this.variant = "primary";
    this.size = "m";
    this.identifier = undefined;
    this.collapsible = false;
    this.annotation = undefined;
    this.label = undefined;
    this.disabled = false;
    this.isExpanded = false;
    this.labelTag = "h3";
    this.h = govHost(this.host);
    this.triggerId = createID("GovWizardItem");
    this.contentId = createID("GovWizardContent");
  }
  validateLabel(newValue) {
    if (!newValue) {
      govErrorLog(`[${WizardItemClass.root}]: Parameter label is required.`);
    }
  }
  validateTriggerTag(newValue) {
    const validTags = ["h1", "h2", "h3", "h4", "h5", "h6", "span"];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        govErrorLog(`[${WizardItemClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  validateVariant(newValue) {
    validateProp(WizardVariants, newValue, WizardItemClass.root);
  }
  emmitChange() {
    this.govChange.emit({ expanded: this.isExpanded, component: WizardItemClass.root });
  }
  componentWillLoad() {
    this.validateLabel(this.label);
    this.validateVariant(this.variant);
    this.validateTriggerTag(this.labelTag);
  }
  render() {
    const triggerId = this.identifier || this.triggerId;
    const LabelTag = this.labelTag;
    const Tag = this.collapsible ? Tags.BUTTON : Tags.DIV;
    const prefixSlot = this.h.hasSlot("prefix") && (h("span", { class: WizardItemClass.prefix }, h("slot", { name: "prefix" })));
    const label = (h(LabelTag, { class: WizardItemClass.title }, h("span", { class: WizardItemClass.name }, h("span", { class: WizardItemClass.label }, h("span", null, this.label), this.collapsible && h("gov-icon", { class: WizardItemClass.arrow, name: "chevron-down" })), this.annotation && h("span", { class: WizardItemClass.annot }, this.annotation))));
    return (h(Host, { class: this.h.classes(WizardItemClass.root), "is-expanded": this.isExpanded, variant: this.variant, size: this.size, role: "listitem", collapsible: this.collapsible }, this.collapsible ? (h(Fragment, null, prefixSlot, h(Tag, { id: triggerId, class: WizardItemClass.header, "aria-expanded": booleanString(this.isExpanded), "aria-controls": this.contentId, disabled: this.disabled, "aria-disabled": toBoolAttrIfDefined(this.disabled), onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.collapsible ? this.toggle() : false;
      } }, label))) : (h(Fragment, null, prefixSlot, h("div", { class: WizardItemClass.header }, label))), this.collapsible ? (h("div", { class: WizardItemClass.content, id: this.contentId, "aria-hidden": booleanString(!this.isExpanded), hidden: !this.isExpanded, "aria-labelledby": triggerId }, h("slot", null))) : (h("div", { class: WizardItemClass.content, "aria-hidden": booleanString(!this.isExpanded), hidden: !this.isExpanded }, h("slot", null)))));
  }
  /**
   * Opening the Wizard
   */
  async open() {
    this.isExpanded = true;
    this.emmitChange();
  }
  /**
   * Closing the Wizard
   */
  async close() {
    this.isExpanded = false;
    this.emmitChange();
  }
  /**
   * Wizard switch
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
  static get is() { return "gov-wizard-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-wizard-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-wizard-item.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WizardVariantsType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "WizardVariantsType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-wizard/constants.ts::WizardVariantsType"
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
        "defaultValue": "\"primary\""
      },
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
          "text": "Custom wizard item identifier. Otherwise, it will be generated"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "collapsible": {
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
          "text": "Defines weather the wizard item can be collapsible"
        },
        "attribute": "collapsible",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Item annotation of the wizard"
        },
        "attribute": "annotation",
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
          "text": "Item label of the wizard"
        },
        "attribute": "label",
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
          "text": "Makes the wizard component disabled."
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
      },
      "labelTag": {
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
          "text": "Used to change the HTML tag in the accordion trigger for correct semantic structure"
        },
        "attribute": "label-tag",
        "reflect": false,
        "defaultValue": "\"h3\""
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
          "original": "WizardItemEvent",
          "resolved": "WizardItemEvent",
          "references": {
            "WizardItemEvent": {
              "location": "import",
              "path": "./gov-wizard-item.types",
              "id": "../../../packages/core/src/components/gov-wizard/gov-wizard-item.types.ts::WizardItemEvent"
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
          "text": "Opening the Wizard",
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
          "text": "Closing the Wizard",
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
          "text": "Wizard switch",
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
        "propName": "label",
        "methodName": "validateLabel"
      }, {
        "propName": "labelTag",
        "methodName": "validateTriggerTag"
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-wizard-item.js.map
