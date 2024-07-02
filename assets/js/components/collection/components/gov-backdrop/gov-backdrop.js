import { h, Host } from "@stencil/core";
import { validateWcagLabel } from "../../helpers/Validate/wcag";
import { BackdropClass } from "./constants";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
import { govHost } from "../../helpers/Dom/template";
export class GovBackdrop {
  constructor() {
    this.inverse = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(BackdropClass.root) }, h("div", { role: 'button', "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy, onClick: e => this.govClick.emit(e), class: BackdropClass.bg })));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, BackdropClass.root);
  }
  static get is() { return "gov-backdrop"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-backdrop.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-backdrop.css"]
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
          "text": "Determine if component should have inverse colors to be used on dark background."
        },
        "attribute": "inverse",
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
          "text": "Adds accessible label for the backdrop that is only shown for screen readers."
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
        "method": "govClick",
        "name": "gov-click",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when button clicks."
        },
        "complexType": {
          "original": "MouseEvent",
          "resolved": "MouseEvent",
          "references": {
            "MouseEvent": {
              "location": "global",
              "id": "global::MouseEvent"
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
//# sourceMappingURL=gov-backdrop.js.map
