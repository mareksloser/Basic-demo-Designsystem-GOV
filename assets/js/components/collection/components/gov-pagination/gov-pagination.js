import Fragment from "../../helpers/Fragment";
import { h, Host } from "@stencil/core";
import { validateProp } from "../../helpers/Validate/props";
import { PaginationClass, PaginationSizes, PaginationTypes, PaginationVariants, } from "./constants";
import { govHost, prepareClasses } from "../../helpers/Dom/template";
import { paginate } from "./pagination";
import { toBoolAttrIfDefined } from "../../helpers/Dom/template";
import { validateWcagLabel, validateWcagProp } from "../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../helpers/Dom/win";
import { delay } from "../../utils/utils";
import { createID } from "../../utils/string.utils";
import { createArrayRange } from "../../utils/array.utils";
export class GovPagination {
  constructor() {
    this.type = "button";
    this.current = 1;
    this.total = 0;
    this.inverse = undefined;
    this.size = "m";
    this.variant = "primary";
    this.pageSize = 10;
    this.maxPages = 5;
    this.link = undefined;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagSelectLabel = "Vybrat stranu";
    this.wcagPageLabel = "Strana";
    this.pagination = undefined;
    this.h = govHost(this.host);
    this.pageSelectId = createID("GovPageSelect");
  }
  validateType(newValue) {
    validateProp(PaginationTypes, newValue, PaginationClass.root);
  }
  validateSize(newValue) {
    validateProp(PaginationSizes, newValue, PaginationClass.root);
  }
  validateVariant(newValue) {
    validateProp(PaginationVariants, newValue, PaginationClass.root);
  }
  recalculate() {
    this.recalculatePagination(this.current);
  }
  componentWillLoad() {
    this.recalculatePagination(this.current);
    this.validateSize(this.size);
    this.validateVariant(this.variant);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  recalculatePagination(currentPage) {
    this.pagination = paginate(this.total, currentPage, this.pageSize, this.maxPages);
  }
  isActivePageClass(originalClass, page) {
    if (this.pagination.currentPage === page) {
      return originalClass + " is-active";
    }
    else {
      return originalClass;
    }
  }
  prepareLinkUrl(page) {
    if (this.link) {
      return String(this.link).replace("{PAGE}", String(page));
    }
    return undefined;
  }
  resetSelectValue() {
    if (this.spreadSelectRef) {
      this.spreadSelectRef.getRef()
        .then((el) => {
        el.value = '...';
      });
    }
  }
  render() {
    const pageResolver = (page, content) => {
      const isDisabled = page === -1;
      const ariaCurrent = toBoolAttrIfDefined(this.pagination.currentPage === page ? true : undefined);
      return (h("gov-button", { href: this.prepareLinkUrl(page), variant: this.variant, size: this.size, type: "base", disabled: isDisabled, "on-gov-click": (e) => this.onClickHandler(e, page), "wcag-label": page > -1 ? this.wcagPageLabel + " " + page : undefined, "wcag-current": ariaCurrent, class: PaginationClass.inner }, content));
    };
    return (h(Host, { class: this.h.classes(PaginationClass.root), type: this.type, variant: this.variant, size: this.size }, h("nav", { "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy }, h("ul", { class: PaginationClass.list }, h("li", { class: prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.currentPage > 1 ? 1 : -1, h("gov-icon", { class: PaginationClass.arrow, name: "chevron-double-left" }))), h("li", { class: prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.startPage < this.pagination.currentPage ? this.pagination.currentPage - 1 : -1, h("gov-icon", { class: PaginationClass.arrow, name: "chevron-left" }))), this.type == "select" ? (h("li", { class: prepareClasses([PaginationClass.item, PaginationClass.itemSelect]) }, h("span", { class: PaginationClass.inner }, h("span", { id: this.pageSelectId, hidden: true }, this.wcagSelectLabel), h("gov-form-select", { size: "m", variant: this.variant, "wcag-labelled-by": this.pageSelectId, "on-gov-change": this.onSelectHandler.bind(this) }, createArrayRange(1, this.pagination.totalPages).map(page => (h("option", { value: page, selected: this.pagination.currentPage === page }, page))))))) : (h(Fragment, null, this.pagination.pages.map(page => (h("li", { class: this.isActivePageClass(PaginationClass.item, page) }, pageResolver(page, page)))), this.pagination.totalPages ? (h("li", { class: prepareClasses([PaginationClass.item, PaginationClass.itemMore]) }, h("span", { class: PaginationClass.inner }, h("span", { id: this.pageSelectId, hidden: true }, this.wcagSelectLabel), h("gov-form-select", { size: "m", variant: this.variant, "wcag-labelled-by": this.pageSelectId, ref: el => (this.spreadSelectRef = el), "on-gov-change": this.onSelectHandler.bind(this) }, h("option", { selected: true, hidden: true }, "..."), createArrayRange(1, this.pagination.totalPages).map(page => (h("option", { value: page, selected: false }, page))))))) : null)), h("li", { class: prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.totalPages > this.pagination.currentPage ? this.pagination.currentPage + 1 : -1, h("gov-icon", { class: PaginationClass.arrow, name: "chevron-right" }))), h("li", { class: prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.totalPages > this.pagination.currentPage ? this.pagination.totalPages : -1, h("gov-icon", { class: PaginationClass.arrow, name: "chevron-double-right" })))))));
  }
  onClickHandler(e, page) {
    e.stopPropagation();
    this.recalculatePagination(page);
    this.govPage.emit({
      component: PaginationClass.root,
      pagination: this.pagination
    });
  }
  onSelectHandler(e) {
    e.stopPropagation();
    const value = e.detail.value;
    const page = parseInt(value);
    this.resetSelectValue();
    if (isNaN(page) === false) {
      this.recalculatePagination(page);
      if (this.link) {
        window.location.href = this.prepareLinkUrl(page);
      }
      else {
        this.govPage.emit({
          component: PaginationClass.root,
          pagination: this.pagination
        });
      }
    }
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagProp(this.wcagPageLabel, "wcag-page-label", PaginationClass.root);
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, PaginationClass.root);
  }
  static get is() { return "gov-pagination"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-pagination.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-pagination.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PaginationType",
          "resolved": "\"button\" | \"select\"",
          "references": {
            "PaginationType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-pagination/constants.ts::PaginationType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Pagination type"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "\"button\""
      },
      "current": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Currently displayed page"
        },
        "attribute": "current",
        "reflect": false,
        "defaultValue": "1"
      },
      "total": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Total count of entries"
        },
        "attribute": "total",
        "reflect": false,
        "defaultValue": "0"
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
          "text": "Set on active page"
        },
        "attribute": "inverse",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PaginationSizeType",
          "resolved": "\"m\" | \"s\"",
          "references": {
            "PaginationSizeType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-pagination/constants.ts::PaginationSizeType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Pagination's size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "\"m\""
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PaginationVariantType",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {
            "PaginationVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-pagination/constants.ts::PaginationVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the pagination."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "\"primary\""
      },
      "pageSize": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum number of entries per page"
        },
        "attribute": "page-size",
        "reflect": false,
        "defaultValue": "10"
      },
      "maxPages": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Maximum pages displayed for selection"
        },
        "attribute": "max-pages",
        "reflect": false,
        "defaultValue": "5"
      },
      "link": {
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
          "text": "Setting a link to redirect to a given page.\nThe {PAGE} wildcard can be used in the link to replace the page number.\nNote that in the case of paging through a link, it is always necessary to send to the component the current page where the user is."
        },
        "attribute": "link",
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
          "text": "Adds accessible label for the pagination that is only shown for screen readers."
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
          "text": "Indicates the id of a component that labels the pagination."
        },
        "attribute": "wcag-labelled-by",
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
          "text": "Adds accessible label for the page select"
        },
        "attribute": "wcag-select-label",
        "reflect": false,
        "defaultValue": "\"Vybrat stranu\""
      },
      "wcagPageLabel": {
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
          "text": "Adds accessible label for the page item"
        },
        "attribute": "wcag-page-label",
        "reflect": false,
        "defaultValue": "\"Strana\""
      }
    };
  }
  static get states() {
    return {
      "pagination": {}
    };
  }
  static get events() {
    return [{
        "method": "govPage",
        "name": "gov-page",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event called when changing the page with the current setting of the whole paging"
        },
        "complexType": {
          "original": "PaginationEvent",
          "resolved": "PaginationEvent",
          "references": {
            "PaginationEvent": {
              "location": "import",
              "path": "./gov-pagination.types",
              "id": "../../../packages/core/src/components/gov-pagination/gov-pagination.types.ts::PaginationEvent"
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
        "propName": "type",
        "methodName": "validateType"
      }, {
        "propName": "size",
        "methodName": "validateSize"
      }, {
        "propName": "variant",
        "methodName": "validateVariant"
      }, {
        "propName": "current",
        "methodName": "recalculate"
      }, {
        "propName": "total",
        "methodName": "recalculate"
      }, {
        "propName": "pageSize",
        "methodName": "recalculate"
      }, {
        "propName": "maxPages",
        "methodName": "recalculate"
      }];
  }
}
//# sourceMappingURL=gov-pagination.js.map
