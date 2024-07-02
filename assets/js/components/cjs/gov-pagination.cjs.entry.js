'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const Fragment = require('./Fragment-52846f79.js');
const props = require('./props-d6146e54.js');
const sizes = require('./sizes-79872c2a.js');
const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const string_utils = require('./string.utils-0f08c48c.js');
require('./gov.log-b842920d.js');

const PaginationSizes = utils.pick(sizes.Sizes, ['_S', '_M']);
const PaginationVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
var PaginationTypes;
(function (PaginationTypes) {
  PaginationTypes["BUTTON"] = "button";
  PaginationTypes["SELECT"] = "select";
})(PaginationTypes || (PaginationTypes = {}));
const PaginationClass = {
  root: 'gov-pagination',
  list: 'gov-pagination__list',
  item: 'gov-pagination__item',
  itemArrow: 'gov-pagination__item--arrow',
  itemMore: 'gov-pagination__item--more',
  itemSelect: 'gov-pagination__item--select',
  inner: 'gov-pagination__inner',
  arrow: 'gov-pagination__arrow',
};

function paginate(totalItems, currentPage = 1, pageSize = 10, maxPages = 10) {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);
  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  }
  else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  }
  else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    }
    else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    }
    else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }
  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  // create an array of pages to ng-repeat in the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(i => startPage + i);
  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
}

const createArrayRange = (from, to) => {
  if (Number.isInteger(from) && Number.isInteger(to)) {
    return [...Array(to + 1).keys()].slice(from);
  }
  return [];
};

const govPaginationCss = ".gov-pagination__list{margin:0;padding:0}.gov-pagination__list .gov-pagination__item{margin:0;padding:0;background:none}.gov-pagination__list .gov-pagination__item::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-pagination{position:relative;display:block;width:100%}.gov-pagination__list{display:flex;align-items:center;flex-wrap:wrap;font-weight:bold;text-align:center}.gov-pagination__list .gov-pagination__item{display:flex;justify-content:center;align-items:center;margin:0;padding:0.125rem;border-radius:var(--gov-border-radius, 0.1875rem);overflow:hidden}.gov-pagination__list .gov-pagination__item--arrow{display:flex}.gov-pagination__list .gov-pagination__item--select{z-index:1;display:flex;overflow:visible;padding:0rem 1rem}.gov-pagination__arrow{margin:0}.gov-pagination__item--more .gov-form-select select{border:none !important;padding-right:0.75rem !important}.gov-pagination__item--more .gov-form-select .gov-icon{display:none}.gov-pagination__inner{display:flex;justify-content:center;align-items:center;align-self:stretch;width:100%;text-decoration:none}.gov-pagination__inner[wcag-current=true][type=solid][variant=primary] .element{background-color:var(--gov-button-primary-solid-hover-bg, var(--gov-color-primary-700));color:var(--gov-button-primary-solid-hover-color, var(--gov-color-neutral-white))}.gov-pagination__inner[wcag-current=true][type=outlined][variant=primary] .element{background-color:var(--gov-button-primary-outlined-hover-bg, var(--gov-color-primary-100));color:var(--gov-button-primary-outlined-hover-color, var(--gov-color-primary))}.gov-pagination__inner[wcag-current=true][type=base][variant=primary] .element{background-color:var(--gov-button-primary-base-hover-bg, var(--gov-color-primary-100));color:var(--gov-button-primary-base-hover-color, var(--gov-color-primary))}.gov-pagination__inner[wcag-current=true][type=link][variant=primary] .element{background-color:var(--gov-button-primary-link-hover-bg, transparent);color:var(--gov-button-primary-link-hover-color, var(--gov-color-primary))}.gov-pagination__inner[wcag-current=true][type=solid][variant=secondary] .element{background-color:var(--gov-button-secondary-solid-hover-bg, var(--gov-color-secondary-900));color:var(--gov-button-secondary-solid-hover-color, var(--gov-color-neutral-white))}.gov-pagination__inner[wcag-current=true][type=outlined][variant=secondary] .element{background-color:var(--gov-button-secondary-outlined-hover-bg, var(--gov-color-secondary-300));color:var(--gov-button-secondary-outlined-hover-color, var(--gov-color-secondary))}.gov-pagination__inner[wcag-current=true][type=base][variant=secondary] .element{background-color:var(--gov-button-secondary-base-hover-bg, var(--gov-color-secondary-300));color:var(--gov-button-secondary-base-hover-color, var(--gov-color-secondary))}.gov-pagination__inner[wcag-current=true][type=link][variant=secondary] .element{background-color:var(--gov-button-secondary-link-hover-bg, transparent);color:var(--gov-button-secondary-link-hover-color, var(--gov-color-secondary))}.gov-pagination__inner[wcag-current=true][type=solid][variant=error] .element{background-color:var(--gov-button-error-solid-hover-bg, var(--gov-color-error-500));color:var(--gov-button-error-solid-hover-color, var(--gov-color-neutral-white))}.gov-pagination__inner[wcag-current=true][type=outlined][variant=error] .element{background-color:var(--gov-button-error-outlined-hover-bg, var(--gov-color-error-100));color:var(--gov-button-error-outlined-hover-color, var(--gov-color-error))}.gov-pagination__inner[wcag-current=true][type=base][variant=error] .element{background-color:var(--gov-button-error-base-hover-bg, var(--gov-color-error-100));color:var(--gov-button-error-base-hover-color, var(--gov-color-error))}.gov-pagination__inner[wcag-current=true][type=link][variant=error] .element{background-color:var(--gov-button-error-link-hover-bg, transparent);color:var(--gov-button-error-link-hover-color, var(--gov-color-error))}.gov-pagination__inner[wcag-current=true][type=solid][variant=success] .element{background-color:var(--gov-button-success-solid-hover-bg, var(--gov-color-success-600));color:var(--gov-button-success-solid-hover-color, var(--gov-color-neutral-white))}.gov-pagination__inner[wcag-current=true][type=outlined][variant=success] .element{background-color:var(--gov-button-success-outlined-hover-bg, var(--gov-color-success-100));color:var(--gov-button-success-outlined-hover-color, var(--gov-color-success-500))}.gov-pagination__inner[wcag-current=true][type=base][variant=success] .element{background-color:var(--gov-button-success-base-hover-bg, var(--gov-color-success-100));color:var(--gov-button-success-base-hover-color, var(--gov-color-success-500))}.gov-pagination__inner[wcag-current=true][type=link][variant=success] .element{background-color:var(--gov-button-success-link-hover-bg, transparent);color:var(--gov-button-success-link-hover-color, var(--gov-color-success-500))}.gov-pagination__inner[wcag-current=true][type=solid][variant=warning] .element{background-color:var(--gov-button-warning-solid-hover-bg, var(--gov-color-warning-600));color:var(--gov-button-warning-solid-hover-color, var(--gov-color-neutral-white))}.gov-pagination__inner[wcag-current=true][type=outlined][variant=warning] .element{background-color:var(--gov-button-warning-outlined-hover-bg, var(--gov-color-warning-200));color:var(--gov-button-warning-outlined-hover-color, var(--gov-color-warning-500))}.gov-pagination__inner[wcag-current=true][type=base][variant=warning] .element{background-color:var(--gov-button-warning-base-hover-bg, var(--gov-color-warning-200));color:var(--gov-button-warning-base-hover-color, var(--gov-color-warning-500))}.gov-pagination__inner[wcag-current=true][type=link][variant=warning] .element{background-color:var(--gov-button-warning-link-hover-bg, transparent);color:var(--gov-button-warning-link-hover-color, var(--gov-color-warning-500))}.gov-pagination[size=s] .gov-pagination__inner{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);font-weight:inherit}.gov-pagination[size=s] .gov-pagination__inner .element{min-width:var(--gov-pagination-s-button-size, 2rem)}.gov-pagination[size=m] .gov-pagination__inner{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);font-weight:inherit}.gov-pagination[size=m] .gov-pagination__inner .element{min-width:var(--gov-pagination-m-button-size, 2.5rem)}";

const GovPagination = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govPage = index.createEvent(this, "gov-page", 7);
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
    this.h = template.govHost(this.host);
    this.pageSelectId = string_utils.createID("GovPageSelect");
  }
  validateType(newValue) {
    props.validateProp(PaginationTypes, newValue, PaginationClass.root);
  }
  validateSize(newValue) {
    props.validateProp(PaginationSizes, newValue, PaginationClass.root);
  }
  validateVariant(newValue) {
    props.validateProp(PaginationVariants, newValue, PaginationClass.root);
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
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
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
      const ariaCurrent = template.toBoolAttrIfDefined(this.pagination.currentPage === page ? true : undefined);
      return (index.h("gov-button", { href: this.prepareLinkUrl(page), variant: this.variant, size: this.size, type: "base", disabled: isDisabled, "on-gov-click": (e) => this.onClickHandler(e, page), "wcag-label": page > -1 ? this.wcagPageLabel + " " + page : undefined, "wcag-current": ariaCurrent, class: PaginationClass.inner }, content));
    };
    return (index.h(index.Host, { class: this.h.classes(PaginationClass.root), type: this.type, variant: this.variant, size: this.size }, index.h("nav", { "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy }, index.h("ul", { class: PaginationClass.list }, index.h("li", { class: template.prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.currentPage > 1 ? 1 : -1, index.h("gov-icon", { class: PaginationClass.arrow, name: "chevron-double-left" }))), index.h("li", { class: template.prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.startPage < this.pagination.currentPage ? this.pagination.currentPage - 1 : -1, index.h("gov-icon", { class: PaginationClass.arrow, name: "chevron-left" }))), this.type == "select" ? (index.h("li", { class: template.prepareClasses([PaginationClass.item, PaginationClass.itemSelect]) }, index.h("span", { class: PaginationClass.inner }, index.h("span", { id: this.pageSelectId, hidden: true }, this.wcagSelectLabel), index.h("gov-form-select", { size: "m", variant: this.variant, "wcag-labelled-by": this.pageSelectId, "on-gov-change": this.onSelectHandler.bind(this) }, createArrayRange(1, this.pagination.totalPages).map(page => (index.h("option", { value: page, selected: this.pagination.currentPage === page }, page))))))) : (index.h(Fragment.Fragment, null, this.pagination.pages.map(page => (index.h("li", { class: this.isActivePageClass(PaginationClass.item, page) }, pageResolver(page, page)))), this.pagination.totalPages ? (index.h("li", { class: template.prepareClasses([PaginationClass.item, PaginationClass.itemMore]) }, index.h("span", { class: PaginationClass.inner }, index.h("span", { id: this.pageSelectId, hidden: true }, this.wcagSelectLabel), index.h("gov-form-select", { size: "m", variant: this.variant, "wcag-labelled-by": this.pageSelectId, ref: el => (this.spreadSelectRef = el), "on-gov-change": this.onSelectHandler.bind(this) }, index.h("option", { selected: true, hidden: true }, "..."), createArrayRange(1, this.pagination.totalPages).map(page => (index.h("option", { value: page, selected: false }, page))))))) : null)), index.h("li", { class: template.prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.totalPages > this.pagination.currentPage ? this.pagination.currentPage + 1 : -1, index.h("gov-icon", { class: PaginationClass.arrow, name: "chevron-right" }))), index.h("li", { class: template.prepareClasses([PaginationClass.item, PaginationClass.itemArrow]) }, pageResolver(this.pagination.totalPages > this.pagination.currentPage ? this.pagination.totalPages : -1, index.h("gov-icon", { class: PaginationClass.arrow, name: "chevron-double-right" })))))));
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
    wcag.validateWcagProp(this.wcagPageLabel, "wcag-page-label", PaginationClass.root);
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, PaginationClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "type": ["validateType"],
    "size": ["validateSize"],
    "variant": ["validateVariant"],
    "current": ["recalculate"],
    "total": ["recalculate"],
    "pageSize": ["recalculate"],
    "maxPages": ["recalculate"]
  }; }
};
GovPagination.style = govPaginationCss;

exports.gov_pagination = GovPagination;

//# sourceMappingURL=gov-pagination.cjs.entry.js.map