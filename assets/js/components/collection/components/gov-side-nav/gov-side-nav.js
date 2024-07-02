import { h, Host } from "@stencil/core";
import { SideNavClass, SideNavItemClass } from "./constants";
import { validateWcagLabel } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
import { booleanString } from "../../helpers/Dom/template";
export class GovSideNav {
  constructor() {
    this.inverse = false;
    this.compact = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
  }
  componentDidLoad() {
    this.host.querySelectorAll(SideNavItemClass.root).forEach((child) => {
      child.setAttribute('inverse', booleanString(this.inverse));
      child.setAttribute('compact', booleanString(this.compact));
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit(e.detail);
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
    return (h(Host, { class: SideNavClass.root, compact: this.compact, inverse: this.inverse, "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, h("aside", { class: SideNavClass.aside, role: 'list' }, h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, SideNavClass.root);
  }
  static get is() { return "gov-side-nav"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-side-nav.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-side-nav.css"]
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
          "text": "Determide if component should have inversed colors to be used on dark background."
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
          "text": "Adds accessible label for the sidenav that is only shown for screen readers."
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
}
//# sourceMappingURL=gov-side-nav.js.map
