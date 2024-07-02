import { h, Host } from "@stencil/core";
import { govErrorLog } from "../../helpers/Log/gov.log";
import { SideNavItemClass } from "./constants";
import { booleanString, prepareClasses } from "../../helpers/Dom/template";
import { govHost } from "../../helpers/Dom/template";
export class GovSideNavItem {
  constructor() {
    this.isExpandedState = undefined;
    this.inverse = false;
    this.compact = false;
    this.identifier = undefined;
    this.count = false;
    this.label = undefined;
    this.disabled = false;
    this.href = undefined;
    this.isExpanded = false;
    this.h = govHost(this.host);
  }
  validateLabel(newValue) {
    if (!newValue) {
      govErrorLog(`[${SideNavItemClass.root}]: Parameter label is required.`);
    }
  }
  emmitChange() {
    this.govChange.emit({ open: this.isExpandedState, element: this.host });
  }
  componentWillLoad() {
    this.isExpandedState = this.isExpanded;
    this.validateLabel(this.label);
  }
  get classNames() {
    const { h } = this;
    return prepareClasses([SideNavItemClass.root, h.hasSlot('icon') && SideNavItemClass.rootWithIcon]);
  }
  render() {
    const { isExpandedState, label } = this;
    // TODO: správný počet zanořených childů
    const hasChilds = this.host.children.length > 1;
    return (h(Host, { class: this.classNames, role: "listitem", inverse: this.inverse, "aria-expanded": booleanString(isExpandedState) }, this.href ? (h("div", { class: SideNavItemClass.header }, h("a", { class: SideNavItemClass.name, href: this.href }, this.h.hasSlot('icon') && (h("span", { class: SideNavItemClass.icon }, h("slot", { name: "icon" }))), h("span", { class: SideNavItemClass.label }, label), this.count && (h("span", { class: SideNavItemClass.chip }, h("gov-chip", { variant: "secondary", size: "s", inverse: this.inverse }, "3")))), hasChilds && (h("button", { type: "button", class: SideNavItemClass.arrow, onClick: () => this.toggle() }, h("gov-icon", { name: "chevron-down" }))))) : (h("div", { class: SideNavItemClass.header }, h("button", { class: SideNavItemClass.name, type: "button", onClick: () => this.toggle() }, this.h.hasSlot('icon') && (h("span", { class: SideNavItemClass.icon }, h("slot", { name: "icon" }))), h("span", { class: SideNavItemClass.label }, label), hasChilds && (h("span", { class: SideNavItemClass.arrow }, h("gov-icon", { name: "chevron-down" })))))), hasChilds && (h("div", { class: SideNavItemClass.content }, h("slot", null)))));
  }
  /**
   * Opening the sidenav
   */
  async open() {
    this.isExpandedState = true;
    this.emmitChange();
  }
  /**
   * Closing the sidenav
   */
  async close() {
    this.isExpandedState = false;
    this.emmitChange();
  }
  /**
   * sidenav switch
   */
  async toggle() {
    this.isExpandedState = !this.isExpandedState;
    this.emmitChange();
  }
  /**
   * Returns the current state of the component
   */
  async currentState() {
    return this.isExpandedState;
  }
  static get is() { return "gov-side-nav-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-side-nav-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-side-nav-item.css"]
    };
  }
  static get properties() {
    return {
      "inverse": {
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
          "text": "Determide if component should have inversed colors to be used on dark background"
        },
        "attribute": "inverse",
        "reflect": false,
        "defaultValue": "false"
      },
      "compact": {
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
          "text": "Determide if component should have compact styles."
        },
        "attribute": "compact",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Custom sidenav item identifier. Otherwise, it will be generated"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "count": {
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
          "text": "Defined the count of nested items"
        },
        "attribute": "count",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Item name of the sidenav"
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
          "text": "Makes the button component disabled.\nThis prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "href": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "href",
        "reflect": false
      },
      "isExpanded": {
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
          "text": "Defines whether the sidenav is open or closed by button"
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
          "text": "Called when the sidenav state changes"
        },
        "complexType": {
          "original": "GovSideNavItemChangeEvent",
          "resolved": "GovSideNavItemChangeEvent",
          "references": {
            "GovSideNavItemChangeEvent": {
              "location": "import",
              "path": "./gov-side-nav-item.d",
              "id": "../../../packages/core/src/components/gov-side-nav/gov-side-nav-item.d.tsx::GovSideNavItemChangeEvent"
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
          "text": "Opening the sidenav",
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
          "text": "Closing the sidenav",
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
          "text": "sidenav switch",
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
      }];
  }
}
//# sourceMappingURL=gov-side-nav-item.js.map
