import { h, Host } from "@stencil/core";
import { AttachmentsItemClass } from "./constants";
import { validateWcagLabel } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
import { govHost } from "../../helpers/Dom/template";
export class GovAttachmentsItem {
  constructor() {
    this.wcagRemoveLabel = undefined;
    this.wcagRemoveLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(AttachmentsItemClass.root), role: "listitem" }, h("div", { class: AttachmentsItemClass.file }, h("p", { class: AttachmentsItemClass.name }, h("slot", null), h("slot", { name: "info" })), h("gov-button", { variant: "primary", type: "base", size: "s", "wcag-label": this.wcagRemoveLabel, "wcag-labelled-by": this.wcagRemoveLabelledBy, "on-gov-click": this.govRemove.emit }, h("gov-icon", { slot: "left-icon", name: "x-lg" }))), this.h.hasSlot('message') && (h("div", { class: AttachmentsItemClass.messages }, h("slot", { name: "message" })))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagRemoveLabel, this.wcagRemoveLabelledBy, AttachmentsItemClass.root);
  }
  static get is() { return "gov-attachments-item"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-attachments-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-attachments-item.css"]
    };
  }
  static get properties() {
    return {
      "wcagRemoveLabel": {
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
          "text": "Adds accessible label for the remove button that is only shown for screen readers."
        },
        "attribute": "wcag-remove-label",
        "reflect": false
      },
      "wcagRemoveLabelledBy": {
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
          "text": "Indicates the id of a component that labels the remove button."
        },
        "attribute": "wcag-remove-labelled-by",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "govRemove",
        "name": "gov-remove",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the file is removed"
        },
        "complexType": {
          "original": "PointerEvent",
          "resolved": "PointerEvent",
          "references": {
            "PointerEvent": {
              "location": "global",
              "id": "global::PointerEvent"
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
//# sourceMappingURL=gov-attachments-item.js.map
