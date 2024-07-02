import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { g as govHost, a as toBoolAttr, t as toBoolAttrIfDefined } from './template-df429738.js';
import { a as validateWcagRef, b as validateWcagLabelFor } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { g as govForm } from './form-39dc6896.js';
import './gov.log-49da0221.js';
import './sizes-6c5943b4.js';
import './variants-2b936d58.js';
import './constants-3df712e2.js';
import './constants-47d7a8bc.js';
import './constants-ebec7de8.js';

const FormFileClass = {
  root: 'gov-form-file',
  area: 'gov-form-file__area',
  label: 'gov-form-file__label',
  input: 'gov-form-file__input',
  list: 'gov-form-file__list',
  item: 'gov-form-file__item',
  attachments: 'gov-form-file__attachments',
};

function formatBytes(bytes) {
  const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
}
function fileAcceptValidation(file, accept) {
  if (typeof accept === 'string' && accept.length) {
    return (accept
      .replace(/\s/g, '')
      .split(',')
      .filter(accept => {
      return new RegExp(accept.replace('*', '.*')).test(file.type);
    }).length > 0);
  }
  else {
    return true;
  }
}
function fileSizeValidation(file, maxSize) {
  const fileSize = Math.round(file.size);
  return fileSize <= maxSize;
}

const govFormFileCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-file{position:relative;display:block;width:100%}.gov-form-file__label .gov-form-label__label>*:last-child{margin-bottom:0}.gov-form-file__input{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0.0001;cursor:pointer}.gov-form-file__attachments{margin-top:1rem 0rem 0rem}.gov-form-file__item{display:flex;gap:1rem;align-items:center}.gov-form-file[disabled=\"\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[disabled=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[disabled=\"1\"] .gov-form-file__label .gov-form-label__label{pointer-events:none}.gov-form-file[disabled=\"\"] .gov-form-file__label .gov-form-label__label *,.gov-form-file[disabled=true i] .gov-form-file__label .gov-form-label__label *,.gov-form-file[disabled=\"1\"] .gov-form-file__label .gov-form-label__label *{color:var(--gov-form-file-disabled-color, var(--gov-color-secondary-600))}.gov-form-file[expanded=\"\"] .gov-form-file__area,.gov-form-file[expanded=true i] .gov-form-file__area,.gov-form-file[expanded=\"1\"] .gov-form-file__area{position:relative;width:100%;padding:2rem 1.375rem 1.375rem;border:var(--gov-form-file-border, 0.0625rem dashed var(--gov-color-secondary-500));text-align:center;transition:background-color 150ms ease-in-out;will-change:background-color}.gov-form-file[expanded=\"\"] .gov-form-file__area.highlight,.gov-form-file[expanded=true i] .gov-form-file__area.highlight,.gov-form-file[expanded=\"1\"] .gov-form-file__area.highlight{background-color:var(--gov-color-primary-200)}.gov-form-file[expanded=\"\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"1\"] .gov-form-file__label .gov-form-label__label{width:100%;padding:1.375rem;border:var(--gov-form-file-border, 0.0625rem dashed var(--gov-color-secondary-500));text-align:center}.gov-form-file[expanded=\"\"] .gov-form-file__attachments,.gov-form-file[expanded=true i] .gov-form-file__attachments,.gov-form-file[expanded=\"1\"] .gov-form-file__attachments{margin:1.5rem 0rem 0rem}.gov-form-file[expanded=\"\"][invalid=\"\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"\"][invalid=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"\"][invalid=\"1\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i][invalid=\"\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i][invalid=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i][invalid=\"1\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"1\"][invalid=\"\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"1\"][invalid=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"1\"][invalid=\"1\"] .gov-form-file__label .gov-form-label__label{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-file[expanded=\"\"][invalid=\"\"] .gov-form-file__area,.gov-form-file[expanded=\"\"][invalid=true i] .gov-form-file__area,.gov-form-file[expanded=\"\"][invalid=\"1\"] .gov-form-file__area,.gov-form-file[expanded=true i][invalid=\"\"] .gov-form-file__area,.gov-form-file[expanded=true i][invalid=true i] .gov-form-file__area,.gov-form-file[expanded=true i][invalid=\"1\"] .gov-form-file__area,.gov-form-file[expanded=\"1\"][invalid=\"\"] .gov-form-file__area,.gov-form-file[expanded=\"1\"][invalid=true i] .gov-form-file__area,.gov-form-file[expanded=\"1\"][invalid=\"1\"] .gov-form-file__area{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-file[expanded=\"\"][disabled=\"\"] .gov-form-file__area,.gov-form-file[expanded=\"\"][disabled=true i] .gov-form-file__area,.gov-form-file[expanded=\"\"][disabled=\"1\"] .gov-form-file__area,.gov-form-file[expanded=true i][disabled=\"\"] .gov-form-file__area,.gov-form-file[expanded=true i][disabled=true i] .gov-form-file__area,.gov-form-file[expanded=true i][disabled=\"1\"] .gov-form-file__area,.gov-form-file[expanded=\"1\"][disabled=\"\"] .gov-form-file__area,.gov-form-file[expanded=\"1\"][disabled=true i] .gov-form-file__area,.gov-form-file[expanded=\"1\"][disabled=\"1\"] .gov-form-file__area{pointer-events:none;color:var(--gov-form-file-disabled-color, var(--gov-color-secondary-600))}@media (min-width: 30em){.gov-form-file[expanded=\"\"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=\"1\"] .gov-form-file__label .gov-form-label__label{padding:2rem}}";

const GovFormFile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govFocus = createEvent(this, "gov-focus", 7);
    this.govBlur = createEvent(this, "gov-blur", 7);
    this.govFiles = createEvent(this, "gov-files", 7);
    this.govAddFile = createEvent(this, "gov-add-file", 7);
    this.govRemoveFile = createEvent(this, "gov-remove-file", 7);
    this.expanded = false;
    this.required = false;
    this.disabled = false;
    this.displayAttachments = true;
    this.name = undefined;
    this.accept = undefined;
    this.multiple = false;
    this.maxFileSize = -1;
    this.identifier = undefined;
    this.invalid = undefined;
    this.errorSize = "Soubor je větší než povolená velikost {FILE_SIZE}";
    this.errorAccept = "Soubor tohoto typu není povolen";
    this.attachmentsLabel = "Přílohy";
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagRemoveLabel = "Odebrat soubor {FILE_NAME}";
    this.wcagAttachmentsLabel = "Přílohy";
    this.files = [];
    this.fileId = createID("GovInputFile");
    this.h = govHost(this.host);
    this.f = govForm(this.h);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", "File");
  }
  registerListeners() {
    function highlight() {
      this.areaRef.classList.add("highlight");
    }
    function unhighlight() {
      this.areaRef.classList.remove("highlight");
    }
    this.inputRef.addEventListener("change", e => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.target.files;
      this.validateFiles(files);
    }, false);
    //this.inputRef.addEventListener('focus')
    if (this.expanded) {
      const events = ["dragover", "dragleave"];
      const inEvents = ["dragenter", "dragover", "mouseenter"];
      const outEvents = ["dragleave", "drop", "mouseleave"];
      events.map(eventName => this.inputRef.addEventListener(eventName, this.preventDefaults.bind(this), false));
      inEvents.map(eventName => this.inputRef.addEventListener(eventName, highlight.bind(this), false));
      outEvents.forEach(eventName => this.inputRef.addEventListener(eventName, unhighlight.bind(this), false));
      this.areaRef.addEventListener("drop", this.handleDrop.bind(this), false);
    }
  }
  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleDrop(e) {
    const dataTransfer = e.dataTransfer;
    this.validateFiles(dataTransfer.files);
  }
  validateFiles(files) {
    let filesBuffer = [];
    Array.from(files).map(file => {
      const isFile = this.files.find(item => item.file.name === file.name && item.file.size === file.size) || null;
      if (isFile === null) {
        const isSizeValid = typeof this.maxFileSize === "number" && this.maxFileSize > 0 ? fileSizeValidation(file, this.maxFileSize) : true;
        const isAcceptValid = fileAcceptValidation(file, this.accept);
        const newFile = {
          id: createID("GovFormFile"),
          file,
          acceptValid: isAcceptValid,
          sizeValid: isSizeValid,
        };
        if (this.displayAttachments) {
          this.files = [...this.files, newFile];
        }
        else {
          filesBuffer = [...filesBuffer, newFile];
        }
        this.govAddFile.emit({
          component: FormFileClass.root,
          file: newFile,
        });
      }
    });
    this.govFiles.emit({
      component: FormFileClass.root,
      files: filesBuffer.length ? filesBuffer : this.files,
    });
  }
  componentWillLoad() {
    this.f.passAttrToLabel("required", String(this.required));
    this.watchDisabled();
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
    this.registerListeners();
  }
  render() {
    return (h(Host, { class: this.h.classes([FormFileClass.root]), invalid: toBoolAttrIfDefined(this.invalid), expanded: toBoolAttrIfDefined(this.expanded) }, h("div", { class: FormFileClass.area, ref: el => (this.areaRef = el) }, h("slot", null), h("input", { class: FormFileClass.input, ref: el => (this.inputRef = el), id: this.identifier || this.fileId, type: "file", name: this.name, accept: this.accept, multiple: this.multiple, onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), required: this.required, disabled: this.disabled, "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": toBoolAttrIfDefined(this.disabled) })), this.h.hasSlot("attachments") ? (h("div", { class: FormFileClass.attachments }, h("slot", { name: "attachments" }))) : null, this.files.length && this.displayAttachments ? (h("div", { class: FormFileClass.attachments }, h("gov-attachments", { label: this.wcagAttachmentsLabel, "wcag-label": this.wcagAttachmentsLabel }, this.files.map(item => (h("gov-attachments-item", { "wcag-remove-labelled-by": item.id, "on-gov-remove": () => this.onRemoveFileHandler(item) }, h("span", { class: "sr-only", id: item.id }, this.wcagRemoveLabel.replace("{FILE_NAME}", item.file.name)), item.file.name, item.acceptValid === false ? (h("gov-form-message", { slot: "message", variant: "error" }, h("gov-icon", { slot: "icon", name: "exclamation-triangle-fill" }), item.acceptValid === false ? this.errorAccept : null)) : null, item.sizeValid === false ? (h("gov-form-message", { slot: "message", variant: "error" }, h("gov-icon", { slot: "icon", name: "exclamation-triangle-fill" }), this.errorSize.replace("{FILE_SIZE}", formatBytes(this.maxFileSize)))) : null, h("span", { slot: "info" }, "(", formatBytes(item.file.size), ")"))))))) : null));
  }
  onRemoveFileHandler(file) {
    const index = this.files.findIndex(item => item.id === file.id);
    if (index !== -1) {
      const files = this.files;
      const removeFile = this.files[index];
      files.splice(index, 1);
      this.files = [...files];
      this.govRemoveFile.emit({
        component: FormFileClass.root,
        file: removeFile,
      });
      this.govFiles.emit({
        component: FormFileClass.root,
        files,
      });
    }
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: FormFileClass.root,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: FormFileClass.root,
      originalEvent: e,
    });
  }
  onChangeHandler(e) {
    e.stopPropagation();
  }
  /**
   * Returns the reference of the native element
   */
  async getRef() {
    return this.inputRef;
  }
  /**
   * Returns the reference of the native area element
   */
  async getAreaRef() {
    return this.areaRef;
  }
  /**
   * Remove all files from component state
   */
  async reset() {
    this.files = [];
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormFileClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormFileClass.root);
    validateWcagLabelFor(this.identifier || this.fileId, this.wcagLabelledBy, FormFileClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["watchDisabled"],
    "invalid": ["watchDisabled"]
  }; }
};
GovFormFile.style = govFormFileCss;

export { GovFormFile as gov_form_file };

//# sourceMappingURL=gov-form-file.entry.js.map