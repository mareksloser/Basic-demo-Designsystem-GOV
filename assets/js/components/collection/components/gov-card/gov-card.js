import { h, Host } from "@stencil/core";
import { CardClass } from "./constants";
import { govHost, booleanString } from "../../helpers/Dom/template";
import { createID } from "../../utils/string.utils";
import { govErrorLog } from "../../helpers/Log/gov.log";
import { validateWcagLabel } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
export class GovCard {
  constructor() {
    this.promotion = false;
    this.label = undefined;
    this.collapsible = false;
    this.expanded = false;
    this.headlineTag = 'h3';
    this.wcagTriggerLabel = undefined;
    this.wcagTriggerLabelledBy = undefined;
    this.isExpanded = undefined;
    this.h = govHost(this.host);
    this.headlineId = createID('GovCardHeadline');
    this.contentId = createID('GovCardContent');
  }
  validateHeadlineTag(newValue) {
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        govErrorLog(`[${CardClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  componentWillLoad() {
    this.isExpanded = this.label ? this.expanded : true;
    this.validateHeadlineTag(this.headlineTag);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  emmitChange() {
    this.govToggle.emit({ open: this.isExpanded, element: this.host });
  }
  render() {
    const HeadlineTag = this.headlineTag;
    return (h(Host, { class: this.h.classes(CardClass.root), "is-expanded": this.isExpanded, collapsible: booleanString(this.collapsible), promotion: this.promotion }, this.label && this.collapsible ? (h("button", { id: this.headlineId, class: CardClass.header, "aria-label": this.wcagTriggerLabel, "aria-labelledby": this.wcagTriggerLabelledBy, "aria-expanded": booleanString(this.isExpanded), "aria-controls": this.contentId, onClick: this.onClickHandler.bind(this) }, h(HeadlineTag, { class: CardClass.title }, this.label), h("gov-icon", { class: CardClass.arrow, name: "chevron-down" }))) : null, this.label && !this.collapsible ? (h("div", { class: CardClass.header }, h(HeadlineTag, { class: CardClass.title }, this.label))) : null, h("div", { class: CardClass.inner, id: this.contentId, "aria-hidden": this.collapsible ? booleanString(!this.isExpanded) : undefined, hidden: this.collapsible ? !this.isExpanded : undefined, "aria-labelledby": this.collapsible ? this.headlineId : undefined }, this.h.hasSlot('img') && (h("p", { class: CardClass.img }, h("slot", { name: "img" }))), h("div", { class: CardClass.main }, this.h.hasSlot('icon') && this.promotion && (h("div", { class: CardClass.icon }, h("slot", { name: "icon" }))), h("div", { class: CardClass.content }, h("slot", null)), this.h.hasSlot('btn') && this.promotion && (h("div", { class: CardClass.btns }, h("slot", { name: "btn" })))), this.h.hasSlot('footer') && (h("div", { class: CardClass.footer }, h("slot", { name: "footer" }))))));
  }
  onClickHandler(e) {
    e.stopPropagation();
    if (this.collapsible) {
      this.isExpanded = !this.isExpanded;
      this.emmitChange();
    }
  }
  /**
   * Open the card if it is collapsible
   */
  async open() {
    if (this.collapsible) {
      this.isExpanded = true;
      this.emmitChange();
    }
  }
  /**
   * Close the card if it is collapsible
   */
  async close() {
    if (this.collapsible) {
      this.isExpanded = false;
      this.emmitChange();
    }
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    if (this.collapsible) {
      validateWcagLabel(this.wcagTriggerLabel, this.wcagTriggerLabelledBy, CardClass.root);
    }
  }
  static get is() { return "gov-card"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-card.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-card.css"]
    };
  }
  static get properties() {
    return {
      "promotion": {
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
          "text": "Style variation of the card."
        },
        "attribute": "promotion",
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
          "text": "Item label of the card"
        },
        "attribute": "label",
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
          "text": "Defines wether the card can be collapsible"
        },
        "attribute": "collapsible",
        "reflect": false,
        "defaultValue": "false"
      },
      "expanded": {
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
          "text": "Defines whether the card is open or closed by button"
        },
        "attribute": "expanded",
        "reflect": false,
        "defaultValue": "false"
      },
      "headlineTag": {
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
          "text": "Used to change the HMTL tag in the card headline for correct semantic structure"
        },
        "attribute": "headline-tag",
        "reflect": false,
        "defaultValue": "'h3'"
      },
      "wcagTriggerLabel": {
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
          "text": "Adds accessible label for the collapsible button that is only shown for screen readers."
        },
        "attribute": "wcag-trigger-label",
        "reflect": false
      },
      "wcagTriggerLabelledBy": {
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
          "text": "A string of identifiers that indicate alternative label elements for collapsible card"
        },
        "attribute": "wcag-trigger-labelled-by",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isExpanded": {}
    };
  }
  static get events() {
    return [{
        "method": "govToggle",
        "name": "gov-toggle",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when the card toggle state changes"
        },
        "complexType": {
          "original": "GovCardChangeEvent",
          "resolved": "GovCardChangeEvent",
          "references": {
            "GovCardChangeEvent": {
              "location": "import",
              "path": "./interfaces",
              "id": "../../../packages/core/src/components/gov-card/interfaces.ts::GovCardChangeEvent"
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
          "text": "Open the card if it is collapsible",
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
          "text": "Close the card if it is collapsible",
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
        "propName": "headlineTag",
        "methodName": "validateHeadlineTag"
      }];
  }
}
//# sourceMappingURL=gov-card.js.map
