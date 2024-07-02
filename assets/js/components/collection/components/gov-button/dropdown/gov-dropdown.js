import { h, Host } from "@stencil/core";
import { registerClickOutside } from "stencil-click-outside";
import { govHost, toBoolAttr } from "../../../helpers/Dom/template";
import { createID } from "../../../utils/string.utils";
import { ButtonClass } from "../button/constants";
import { DropdownClass, Position } from "./constants";
export class GovDropdown {
  constructor() {
    this.open = false;
    this.position = Position.LEFT;
    this.h = govHost(this.host);
    this.listId = createID("GovDropdownList");
    this.controlId = createID("GovDropdownControl");
  }
  componentWillLoad() {
    if (this.trigger) {
      this.trigger.setAttribute("wcag-controls", this.listId);
      this.trigger.setAttribute("wcag-has-popup", toBoolAttr(!!this.list));
      this.trigger.setAttribute("identifier", this.controlId);
      this.trigger.addEventListener("gov-click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.open = !this.open;
        this.govChange.emit({
          component: DropdownClass.root,
          originalEvent: e,
          open: this.open,
        });
      });
    }
  }
  get trigger() {
    return this.host.querySelector(`* > ${ButtonClass.root}`);
  }
  get list() {
    return this.h.getSlot("list");
  }
  render() {
    return (h(Host, { class: this.h.classes([DropdownClass.root]), open: this.open, position: this.position }, h("slot", null), h("div", { ref: el => registerClickOutside(this, el, () => this.open = false), class: DropdownClass.list, id: this.listId, "aria-labelledby": this.controlId, "aria-hidden": toBoolAttr(!this.open), hidden: !this.open }, h("slot", { name: "list" }))));
  }
  /**
   * Returns the current state of the dropdown
   */
  async getState() {
    return this.open;
  }
  /**
   * Sets the dropdown state
   */
  async setOpen(state) {
    this.open = state;
  }
  static get is() { return "gov-dropdown"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-dropdown.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-dropdown.css"]
    };
  }
  static get properties() {
    return {
      "open": {
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
          "text": "Dropdown open state"
        },
        "attribute": "open",
        "reflect": false,
        "defaultValue": "false"
      },
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PositionType",
          "resolved": "\"left\" | \"right\"",
          "references": {
            "PositionType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-button/dropdown/constants.ts::PositionType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Menu display position"
        },
        "attribute": "position",
        "reflect": false,
        "defaultValue": "Position.LEFT"
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
          "text": "Emitted when the dropdown change state"
        },
        "complexType": {
          "original": "DropdownEvent",
          "resolved": "DropdownEvent",
          "references": {
            "DropdownEvent": {
              "location": "import",
              "path": "./gov-dropdown.types",
              "id": "../../../packages/core/src/components/gov-button/dropdown/gov-dropdown.types.ts::DropdownEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "getState": {
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
          "text": "Returns the current state of the dropdown",
          "tags": []
        }
      },
      "setOpen": {
        "complexType": {
          "signature": "(state: boolean) => Promise<void>",
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
          "text": "Sets the dropdown state",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-dropdown.js.map
