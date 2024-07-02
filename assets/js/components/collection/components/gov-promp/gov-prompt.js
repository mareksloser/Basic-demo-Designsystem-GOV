import { h, Host } from "@stencil/core";
import { govHost, toBoolAttr } from "../../helpers/Dom/template";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { govErrorLog } from "../../helpers/Log/gov.log";
import { validateWcagRef } from "../../helpers/Validate/wcag";
import { createID } from "../../utils/string.utils";
import { delay } from "../../utils/utils";
import { ModalClass } from "../gov-modal/constants";
export class GovPrompt {
  constructor() {
    this.open = false;
    this.label = undefined;
    this.role = 'dialog';
    this.labelTag = 'h2';
    this.wcagLabelledBy = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagCloseLabel = 'Zavřít okno';
    this.wcagCloseLabelledBy = undefined;
    this.h = govHost(this.host);
    this.labelId = createID('GovPromptLabel');
    this.contentId = createID('GovPromptContent');
  }
  validateLabelTag(newValue) {
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        govErrorLog(`[${ModalClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  watchOpen(newValue) {
    this.open = newValue;
  }
  showModal() {
    this.open = true;
    document.body.classList.add(ModalClass.bodyFix);
  }
  hideModal() {
    this.open = false;
    document.body.classList.remove(ModalClass.bodyFix);
  }
  async componentWillRender() {
    if (this.open) {
      this.showModal();
    }
    else {
      this.hideModal();
    }
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const LabelTag = this.labelTag;
    return (h(Host, { class: this.h.classes(ModalClass.rootPrompt), open: this.open }, h("dialog", { class: ModalClass.dialog, hidden: !this.open, tabindex: "-1", open: this.open, "aria-modal": "true", "aria-hidden": toBoolAttr(!this.open), "aria-labelledby": this.wcagLabelledBy || this.labelId, "aria-describedby": this.wcagDescribedBy || this.contentId, role: this.role }, h("div", { class: ModalClass.inner }, h("div", { class: ModalClass.header }, this.h.hasSlot('icon') && (h("div", { class: ModalClass.icon }, h("slot", { name: "icon" }))), this.label && (h(LabelTag, { class: ModalClass.title, id: this.labelId }, this.label)), h("gov-button", { class: ModalClass.close, variant: "primary", wcagLabel: this.wcagCloseLabel, wcagLabelledBy: this.wcagCloseLabelledBy, type: "base", "on-gov-click": this.onCloseHandler.bind(this) }, h("gov-icon", { name: "x-lg" }))), h("div", { class: ModalClass.content, id: this.contentId }, h("slot", null)), h("div", { class: ModalClass.actions }, h("slot", { name: "actions" })))), this.open ? (h("gov-backdrop", { "wcag-label": this.wcagCloseLabel, "wcag-labelled-by": this.wcagCloseLabelledBy, "on-gov-click": this.onCloseHandler.bind(this) })) : null));
  }
  onCloseHandler(e) {
    e.stopPropagation();
    this.hideModal();
    this.govClose.emit(e);
  }
  /**
   * Showing the modal
   */
  async show() {
    this.showModal();
  }
  /**
   * Hiding the modal
   */
  async hide() {
    this.hideModal();
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagLabelledBy, 'wcag-labelled-by', ModalClass.root);
    validateWcagRef(this.wcagDescribedBy, 'wcag-described-by', ModalClass.root);
  }
  static get is() { return "gov-prompt"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-prompt.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-prompt.css"]
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
          "text": "Attribute for modal window display"
        },
        "attribute": "open",
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
          "text": "Title of modal window"
        },
        "attribute": "label",
        "reflect": false
      },
      "role": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Nullable<string>",
          "resolved": "string",
          "references": {
            "Nullable": {
              "location": "import",
              "path": "../../types/interfaces",
              "id": "../../../packages/core/src/types/interfaces.ts::Nullable"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Role of modal"
        },
        "attribute": "role",
        "reflect": false,
        "defaultValue": "'dialog'"
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
          "text": "Used to change the HTML tag in the modal label for correct semantic structure"
        },
        "attribute": "label-tag",
        "reflect": false,
        "defaultValue": "'h2'"
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
      },
      "wcagDescribedBy": {
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
          "text": "Indicates the id of a component that describes the modal."
        },
        "attribute": "wcag-described-by",
        "reflect": false
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
          "text": "Adds accessible label for the modal close button that is only shown for screen readers."
        },
        "attribute": "wcag-close-label",
        "reflect": false,
        "defaultValue": "'Zav\u0159\u00EDt okno'"
      },
      "wcagCloseLabelledBy": {
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
          "text": "A string of identifiers that indicate alternative label elements for closing the modal window"
        },
        "attribute": "wcag-close-labelled-by",
        "reflect": false
      }
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
          "text": "Emitted when modal window closes."
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
      "show": {
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
          "text": "Showing the modal",
          "tags": []
        }
      },
      "hide": {
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
          "text": "Hiding the modal",
          "tags": []
        }
      },
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
        "propName": "labelTag",
        "methodName": "validateLabelTag"
      }, {
        "propName": "open",
        "methodName": "watchOpen"
      }];
  }
}
//# sourceMappingURL=gov-prompt.js.map
