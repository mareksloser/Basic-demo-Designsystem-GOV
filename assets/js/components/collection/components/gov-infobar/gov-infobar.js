import { h, Host } from "@stencil/core";
import { govHost, toBoolAttr } from "../../helpers/Dom/template";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import Fragment from "../../helpers/Fragment";
import { validateProp } from "../../helpers/Validate/props";
import { validateWcagProp } from "../../helpers/Validate/wcag";
import { delay } from "../../utils/utils";
import { InfobarClass, InfobarVariants } from "./constants";
export class GovInfobar {
  constructor() {
    this.headline = undefined;
    this.variant = 'primary';
    this.inverse = false;
    this.wcagCloseLabel = 'Zavřít informační lištu';
    this.wcagToggleLabel = 'Zobrazit více informací';
    this.closable = false;
    this.toggleContent = false;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(InfobarVariants, newValue, InfobarClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    let inverse = !this.inverse;
    let variant = this.inverse ? 'secondary' : this.variant;
    if (this.variant == 'warning') {
      inverse = false;
      variant = 'secondary';
    }
    const closeButton = (h("div", { class: InfobarClass.close }, h("gov-button", { size: "s", wcagLabel: this.wcagCloseLabel, type: "base", variant: variant, inverse: inverse, "on-gov-click": this.onCloseHandler.bind(this) }, h("gov-icon", { name: "x-lg" }))));
    return (h(Host, { class: this.h.classes(InfobarClass.root), variant: this.variant }, h("section", { class: InfobarClass.section, role: "infobar" }, this.h.hasSlot('icon') && (h("div", { class: InfobarClass.icon }, h("slot", { name: "icon" }))), h("div", { class: InfobarClass.content + (this.closable ? ' ' + InfobarClass.closable : '') }, this.headline ? (h(Fragment, null, h("div", { class: InfobarClass.headline }, h("p", null, this.headline), h("gov-button", { size: "s", wcagLabel: this.wcagToggleLabel, type: "base", variant: variant, inverse: inverse, "on-gov-click": () => (this.toggleContent = !this.toggleContent) }, h("gov-icon", { name: this.toggleContent ? 'chevron-up' : 'chevron-down' }))), h("div", { hidden: !this.toggleContent, "aria-hidden": toBoolAttr(this.toggleContent) }, h("slot", null)))) : (h("slot", null)))), this.closable && closeButton));
  }
  onCloseHandler(e) {
    this.govClose.emit({
      component: InfobarClass.root,
      ref: this.host,
      originalEvent: e,
    });
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    if (this.closable) {
      validateWcagProp(this.wcagCloseLabel, 'wcag-close-label', InfobarClass.root);
    }
    if (this.headline) {
      validateWcagProp(this.wcagToggleLabel, 'wcag-toggle-label', InfobarClass.root);
    }
  }
  static get is() { return "gov-infobar"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-infobar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-infobar.css"]
    };
  }
  static get properties() {
    return {
      "headline": {
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
          "text": "Style variation of the button."
        },
        "attribute": "headline",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "VariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "VariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-infobar/constants.ts::VariantType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Style variation of the button."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
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
          "text": "Determine if component should have inverse colors to be used on dark background"
        },
        "attribute": "inverse",
        "reflect": false,
        "defaultValue": "false"
      },
      "wcagCloseLabel": {
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
          "text": "Aria label for the closing button. It is mandatory if the infobar is closable"
        },
        "attribute": "wcag-close-label",
        "reflect": false,
        "defaultValue": "'Zav\u0159\u00EDt informa\u010Dn\u00ED li\u0161tu'"
      },
      "wcagToggleLabel": {
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
          "text": "Aria label for the toggle button. It is mandatory if the infobar has headline"
        },
        "attribute": "wcag-toggle-label",
        "reflect": false,
        "defaultValue": "'Zobrazit v\u00EDce informac\u00ED'"
      },
      "closable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Displays the option to close the infobar"
        },
        "attribute": "closable",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "toggleContent": {}
    };
  }
  static get events() {
    return [{
        "method": "govClose",
        "name": "gov-close",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when the close button is clicked"
        },
        "complexType": {
          "original": "InfobarEvent",
          "resolved": "InfobarEvent",
          "references": {
            "InfobarEvent": {
              "location": "import",
              "path": "./gov-infobar.types",
              "id": "../../../packages/core/src/components/gov-infobar/gov-infobar.types.ts::InfobarEvent"
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
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-infobar.js.map
