import { h, Host } from "@stencil/core";
import { createID } from "../../utils/string.utils";
import { govHost, toBoolAttrIfDefined } from "../../helpers/Dom/template";
import { TabsItemClass } from "./constants";
export class GovTabsItem {
  constructor() {
    this.identifier = undefined;
    this.triggerIdentifier = undefined;
    this.label = undefined;
    this.default = false;
    this.isActive = false;
    this.h = govHost(this.host);
    this.contentId = createID('GovTabContent');
    this.triggerId = createID('GovTabTrigger');
  }
  render() {
    return (h(Host, { class: this.h.classes(TabsItemClass.root), default: this.default }, h("div", { class: TabsItemClass.inner, role: "tabpanel", id: this.identifier || this.contentId, hidden: !this.isActive, "aria-labelledby": this.triggerIdentifier || this.triggerId, "aria-hidden": toBoolAttrIfDefined(!this.isActive) }, h("slot", null))));
  }
  /**
   * Returns a unique tab content identifier
   */
  async getIdentifier() {
    return this.identifier || this.contentId;
  }
  /**
   * Returns a unique tab trigger identifier
   */
  async getTriggerIdentifier() {
    return this.triggerIdentifier || this.triggerId;
  }
  /**
   * Set status of tab-item
   */
  async setActiveStatus(status) {
    this.isActive = status;
  }
  static get is() { return "gov-tabs-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tabs-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tabs-item.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Custom tab item identifier. Otherwise, it will be generated"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "triggerIdentifier": {
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
          "text": "Custom tab trigger item identifier. Otherwise, it will be generated"
        },
        "attribute": "trigger-identifier",
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
          "text": "Item name of the tab"
        },
        "attribute": "label",
        "reflect": true
      },
      "default": {
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
          "text": "Default selected tab"
        },
        "attribute": "default",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isActive": {}
    };
  }
  static get methods() {
    return {
      "getIdentifier": {
        "complexType": {
          "signature": "() => Promise<string>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Returns a unique tab content identifier",
          "tags": []
        }
      },
      "getTriggerIdentifier": {
        "complexType": {
          "signature": "() => Promise<string>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<string>"
        },
        "docs": {
          "text": "Returns a unique tab trigger identifier",
          "tags": []
        }
      },
      "setActiveStatus": {
        "complexType": {
          "signature": "(status: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Set status of tab-item",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-tabs-item.js.map
