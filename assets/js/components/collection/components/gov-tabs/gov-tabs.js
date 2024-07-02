import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { TabsClass, TabsItemClass, TabTypes, TabVariants } from "./constants";
import { govHost, toBoolAttr } from "../../helpers/Dom/template";
import { validateWcagLabel, validateWcagProp } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay, throttle } from "../../utils/utils";
import { createID } from "../../utils/string.utils";
export class GovTabs {
  constructor() {
    this.triggerRefs = {};
    this.controller = [];
    this.focusIndex = 0;
    this.compactControls = false;
    this.type = "text";
    this.variant = "primary";
    this.orientation = "horizontal";
    this.wcagLabel = undefined;
    this.wcagSelectLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
    this.formSelectId = createID("GovFormSelect");
  }
  validateType(newValue) {
    validateProp(TabTypes, newValue, TabsClass.root);
  }
  validateVariant(newValue) {
    validateProp(TabVariants, newValue, TabsClass.root);
  }
  componentWillLoad() {
    this.prepareDataSource();
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
    this.resizeObserver();
  }
  prepareDataSource() {
    this.controller = [];
    const promises = [];
    this.host.querySelectorAll(TabsItemClass.root).forEach((tab) => {
      const controlItem = Promise.all([
        tab.getIdentifier(),
        tab.getTriggerIdentifier(),
      ]).then(([identifier, triggerIdentifier]) => {
        const isDefault = typeof tab.getAttribute("default") === "string";
        return {
          label: tab.getAttribute("label"),
          contentIdentifier: identifier,
          triggerIdentifier: triggerIdentifier,
          element: tab,
          active: false,
          default: isDefault,
        };
      });
      promises.push(controlItem);
    });
    Promise.all(promises).then(controllers => {
      let defaultTab = controllers.findIndex(controller => controller.default);
      if (defaultTab === -1)
        defaultTab = 0;
      this.focusIndex = defaultTab;
      controllers[defaultTab].active = true;
      this.controller = [...controllers];
      this.reRender();
    });
  }
  setActiveByIdentifier(identifier) {
    const temp = [];
    this.controller.map(item => {
      item.active = identifier === item.triggerIdentifier || identifier === item.contentIdentifier;
      temp.push(item);
    });
    this.controller = [...temp];
  }
  reRender() {
    this.controller.map(control => {
      control.element.setActiveStatus(control.active);
    });
  }
  /*
  private evaluateControls() {
    this.compactControls = false
    let sumOfWidth = this.tabsRef.querySelector("ul").offsetWidth
    this.compactControls = this.tabsRef.offsetWidth < sumOfWidth
  }
  */
  resizeObserver() {
    const resizeObserver = new ResizeObserver(throttle(() => {
      // this.evaluateControls()
    }, 200));
    resizeObserver.observe(this.tabsRef);
  }
  render() {
    return (h(Host, { class: this.h.classes(TabsClass.root), variant: this.variant, type: this.type, role: "tablist", ref: el => (this.tabsRef = el), "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy, onKeyDown: this.onKeydownHandler.bind(this) }, h("div", { class: TabsClass.tabs, "aria-hidden": toBoolAttr(this.compactControls) }, h("ul", { class: TabsClass.list }, this.controller.map((control, index) => (h("li", { class: TabsClass.item }, this.type == "text" ? (h("button", { class: TabsClass.btn, id: control.triggerIdentifier, role: "tab", onClick: () => this.onSelectHandler(control, index), "aria-selected": toBoolAttr(control.active), "aria-controls": control.contentIdentifier, tabindex: control.active ? 0 : -1, ref: el => (this.triggerRefs[control.triggerIdentifier] = el) }, control.label)) : (h("gov-chip", { role: "tab", tag: 'button', identifier: control.triggerIdentifier, "wcag-selected": control.active, "wcag-controls": control.contentIdentifier, focusable: control.active, variant: this.variant, inverse: !control.active, ref: el => (this.triggerRefs[control.triggerIdentifier] = el), "on-gov-click": () => this.onSelectHandler(control, index) }, control.label))))))), h("span", { id: this.formSelectId, hidden: true }, this.wcagSelectLabel), this.compactControls ? (h("gov-form-select", { "wcag-labelled-by": this.formSelectId, "onGov-change": this.onChangeHandler.bind(this) }, this.controller.map(control => (h("option", { value: control.triggerIdentifier, selected: control.active }, control.label))))) : null, h("slot", null)));
  }
  getCurrentTab() {
    return this.controller.find(control => control.active) || null;
  }
  onSelectHandler(control, index) {
    this.focusIndex = index;
    this.setActiveByIdentifier(control.triggerIdentifier);
    this.reRender();
    this.govChange.emit(this.getCurrentTab().element);
  }
  onChangeHandler(e) {
    const triggerId = e.target.value;
    e.stopPropagation();
    this.setActiveByIdentifier(triggerId);
    this.reRender();
    this.govChange.emit(this.getCurrentTab().element);
  }
  onKeydownHandler(e) {
    const keyCode = e.keyCode;
    e.stopPropagation();
    if ([37, 38, 39, 40].includes(keyCode)) {
      if (false === (this.focusIndex >= 0 && this.focusIndex <= this.controller.length - 1)) {
        return;
      }
      this.controller[this.focusIndex].active = false;
      if (keyCode === 39 || keyCode === 40) {
        this.focusIndex++;
        if (this.focusIndex >= this.controller.length) {
          this.focusIndex = 0;
        }
      }
      else if (keyCode === 37 || keyCode === 38) {
        this.focusIndex--;
        if (this.focusIndex < 0) {
          this.focusIndex = this.controller.length - 1;
        }
      }
      if (this.focusIndex >= 0 && this.focusIndex <= this.controller.length - 1) {
        const current = this.controller[this.focusIndex];
        current.active = true;
        const trigger = this.triggerRefs[current.triggerIdentifier];
        if (trigger.nodeName.toLowerCase() === 'gov-chip') {
          this.triggerRefs[current.triggerIdentifier].setFocus();
        }
        else {
          this.triggerRefs[current.triggerIdentifier].focus();
        }
        this.controller = [...this.controller];
        this.reRender();
        this.govChange.emit(this.getCurrentTab().element);
      }
    }
  }
  /**
   * Regenerate tabs controllers
   */
  async refresh() {
    this.prepareDataSource();
  }
  /**
   * Returns the currently selected tabs-item
   */
  async currentTab() {
    return this.getCurrentTab().element || null;
  }
  /**
   * Regenerate tabs controllers
   */
  async setActiveTab(identifier) {
    this.setActiveByIdentifier(identifier);
    this.reRender();
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagProp(this.wcagSelectLabel, "wcag-select-label", TabsClass.root);
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, TabsClass.root);
  }
  static get is() { return "gov-tabs"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-tabs.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-tabs.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TabType",
          "resolved": "\"chip\" | \"text\"",
          "references": {
            "TabType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-tabs/constants.ts::TabType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tabs type"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "\"text\""
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
              "id": "../../../packages/core/src/components/gov-tabs/constants.ts::VariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the tab chips."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "\"primary\""
      },
      "orientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TabOrientationType",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {
            "TabOrientationType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-tabs/constants.ts::TabOrientationType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tabs orientation"
        },
        "attribute": "orientation",
        "reflect": false,
        "defaultValue": "\"horizontal\""
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
          "text": "Adds accessible label for the tabs that is only shown for screen readers."
        },
        "attribute": "wcag-label",
        "reflect": false
      },
      "wcagSelectLabel": {
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
          "text": "Adds accessible label for the tabs select"
        },
        "attribute": "wcag-select-label",
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
          "text": "Indicates the id of a component that labels the tabs."
        },
        "attribute": "wcag-labelled-by",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "controller": {},
      "focusIndex": {},
      "compactControls": {}
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
          "text": "Emitted when the tab is changed."
        },
        "complexType": {
          "original": "HTMLGovTabsItemElement",
          "resolved": "HTMLGovTabsItemElement",
          "references": {
            "HTMLGovTabsItemElement": {
              "location": "global",
              "id": "global::HTMLGovTabsItemElement"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "refresh": {
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
          "text": "Regenerate tabs controllers",
          "tags": []
        }
      },
      "currentTab": {
        "complexType": {
          "signature": "() => Promise<Nullable<HTMLGovTabsItemElement>>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLGovTabsItemElement": {
              "location": "global",
              "id": "global::HTMLGovTabsItemElement"
            },
            "Nullable": {
              "location": "import",
              "path": "../../types/interfaces",
              "id": "../../../packages/core/src/types/interfaces.ts::Nullable"
            }
          },
          "return": "Promise<HTMLGovTabsItemElement>"
        },
        "docs": {
          "text": "Returns the currently selected tabs-item",
          "tags": []
        }
      },
      "setActiveTab": {
        "complexType": {
          "signature": "(identifier: string) => Promise<void>",
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
          "text": "Regenerate tabs controllers",
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
        "propName": "type",
        "methodName": "validateType"
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }];
  }
}
//# sourceMappingURL=gov-tabs.js.map
