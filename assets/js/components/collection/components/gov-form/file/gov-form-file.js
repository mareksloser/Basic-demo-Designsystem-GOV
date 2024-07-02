import { h, Host } from "@stencil/core";
import { createID } from "../../../utils/string.utils";
import { FormFileClass } from "./constants";
import { govHost, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { validateWcagLabelFor, validateWcagRef } from "../../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { fileAcceptValidation, fileSizeValidation, formatBytes } from "../../../utils/file.utils";
import { delay } from "../../../utils/utils";
import { govForm } from "../../../helpers/Dom/form";
export class GovFormFile {
  constructor() {
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
  static get is() { return "gov-form-file"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-file.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-file.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Expands the file input to fill 100% of the container width."
        },
        "attribute": "expanded",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
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
          "text": "Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.\nWhen using this property you need to also set \u201Cnovalidate\u201D attribute to your form element to prevent browser from displaying its own validation errors."
        },
        "attribute": "required",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
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
          "text": "Makes the File component disabled.\nThis prevents users from being able to interact with the File, and conveys its inactive state to assistive technologies."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "displayAttachments": {
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
          "text": "Show list of attachments"
        },
        "attribute": "display-attachments",
        "reflect": false,
        "defaultValue": "true"
      },
      "name": {
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
          "text": "Name of the input."
        },
        "attribute": "name",
        "reflect": false
      },
      "accept": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "accept",
        "reflect": false
      },
      "multiple": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "multiple",
        "reflect": false,
        "defaultValue": "false"
      },
      "maxFileSize": {
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
          "text": "Maximum embedded file size"
        },
        "attribute": "max-file-size",
        "reflect": false,
        "defaultValue": "-1"
      },
      "identifier": {
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
          "text": "Custom File identifier."
        },
        "attribute": "identifier",
        "reflect": false
      },
      "invalid": {
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
          "text": "Indicates the entered value does not conform to the format expected by the application."
        },
        "attribute": "invalid",
        "reflect": false
      },
      "errorSize": {
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
          "text": "Error message when the maximum file size is exceeded"
        },
        "attribute": "error-size",
        "reflect": false,
        "defaultValue": "\"Soubor je v\u011Bt\u0161\u00ED ne\u017E povolen\u00E1 velikost {FILE_SIZE}\""
      },
      "errorAccept": {
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
          "text": "Insert unsupported file error message"
        },
        "attribute": "error-accept",
        "reflect": false,
        "defaultValue": "\"Soubor tohoto typu nen\u00ED povolen\""
      },
      "attachmentsLabel": {
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
          "text": "Description of the list of attachments"
        },
        "attribute": "attachments-label",
        "reflect": false,
        "defaultValue": "\"P\u0159\u00EDlohy\""
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
          "text": "Indicates the id of a component that describes the input."
        },
        "attribute": "wcag-described-by",
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
          "text": "Indicates the id of a component that labels the input."
        },
        "attribute": "wcag-labelled-by",
        "reflect": false
      },
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
        "reflect": false,
        "defaultValue": "\"Odebrat soubor {FILE_NAME}\""
      },
      "wcagAttachmentsLabel": {
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
          "text": "Adds accessible label for the list of attachments."
        },
        "attribute": "wcag-attachments-label",
        "reflect": false,
        "defaultValue": "\"P\u0159\u00EDlohy\""
      }
    };
  }
  static get states() {
    return {
      "files": {}
    };
  }
  static get events() {
    return [{
        "method": "govFocus",
        "name": "gov-focus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the File has focus."
        },
        "complexType": {
          "original": "GovFormFileEvent",
          "resolved": "GovFormFileEvent",
          "references": {
            "GovFormFileEvent": {
              "location": "import",
              "path": "./gov-form-file.types",
              "id": "../../../packages/core/src/components/gov-form/file/gov-form-file.types.ts::GovFormFileEvent"
            }
          }
        }
      }, {
        "method": "govBlur",
        "name": "gov-blur",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the File loses focus."
        },
        "complexType": {
          "original": "GovFormFileEvent",
          "resolved": "GovFormFileEvent",
          "references": {
            "GovFormFileEvent": {
              "location": "import",
              "path": "./gov-form-file.types",
              "id": "../../../packages/core/src/components/gov-form/file/gov-form-file.types.ts::GovFormFileEvent"
            }
          }
        }
      }, {
        "method": "govFiles",
        "name": "gov-files",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when the list of inserted files is changed"
        },
        "complexType": {
          "original": "GovFormFileEvent",
          "resolved": "GovFormFileEvent",
          "references": {
            "GovFormFileEvent": {
              "location": "import",
              "path": "./gov-form-file.types",
              "id": "../../../packages/core/src/components/gov-form/file/gov-form-file.types.ts::GovFormFileEvent"
            }
          }
        }
      }, {
        "method": "govAddFile",
        "name": "gov-add-file",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when a new file is added"
        },
        "complexType": {
          "original": "GovFormFileEvent",
          "resolved": "GovFormFileEvent",
          "references": {
            "GovFormFileEvent": {
              "location": "import",
              "path": "./gov-form-file.types",
              "id": "../../../packages/core/src/components/gov-form/file/gov-form-file.types.ts::GovFormFileEvent"
            }
          }
        }
      }, {
        "method": "govRemoveFile",
        "name": "gov-remove-file",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Called when a file is removed from the list"
        },
        "complexType": {
          "original": "GovFormFileEvent",
          "resolved": "GovFormFileEvent",
          "references": {
            "GovFormFileEvent": {
              "location": "import",
              "path": "./gov-form-file.types",
              "id": "../../../packages/core/src/components/gov-form/file/gov-form-file.types.ts::GovFormFileEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "getRef": {
        "complexType": {
          "signature": "() => Promise<HTMLInputElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLInputElement": {
              "location": "global",
              "id": "global::HTMLInputElement"
            }
          },
          "return": "Promise<HTMLInputElement>"
        },
        "docs": {
          "text": "Returns the reference of the native element",
          "tags": []
        }
      },
      "getAreaRef": {
        "complexType": {
          "signature": "() => Promise<HTMLDivElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLDivElement": {
              "location": "global",
              "id": "global::HTMLDivElement"
            }
          },
          "return": "Promise<HTMLDivElement>"
        },
        "docs": {
          "text": "Returns the reference of the native area element",
          "tags": []
        }
      },
      "reset": {
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
          "text": "Remove all files from component state",
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
        "propName": "disabled",
        "methodName": "watchDisabled"
      }, {
        "propName": "invalid",
        "methodName": "watchDisabled"
      }];
  }
}
//# sourceMappingURL=gov-form-file.js.map
