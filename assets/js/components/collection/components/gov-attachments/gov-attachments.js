import { h, Host } from "@stencil/core";
import { AttachmentsClass } from "./constants";
import { validateWcagProp } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
import { govHost } from "../../helpers/Dom/template";
export class GovAttachments {
  constructor() {
    this.label = undefined;
    this.wcagLabel = undefined;
    this.h = govHost(this.host);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(AttachmentsClass.root) }, this.label ? h("p", { class: AttachmentsClass.label }, this.label) : null, h("div", { class: AttachmentsClass.list, role: "list", "aria-label": this.wcagLabel }, h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagProp(this.wcagLabel, 'wcag-label', AttachmentsClass.root);
  }
  static get is() { return "gov-attachments"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-attachments.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-attachments.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Label of attachments section"
        },
        "attribute": "label",
        "reflect": false
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
          "text": "Adds accessible label for the attachment section that is only shown for screen readers."
        },
        "attribute": "wcag-label",
        "reflect": false
      }
    };
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
//# sourceMappingURL=gov-attachments.js.map
