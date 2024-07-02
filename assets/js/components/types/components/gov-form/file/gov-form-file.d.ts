import { EventEmitter } from "../../../stencil-public-runtime";
import { GovFormFileEvent, GovFormFileItem } from "./gov-form-file.types";
export declare class GovFormFile {
  private f;
  private readonly h;
  private areaRef?;
  private inputRef?;
  private readonly fileId;
  constructor();
  host: HTMLGovFormFileElement;
  /**
   * Expands the file input to fill 100% of the container width.
   */
  readonly expanded: boolean;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Makes the File component disabled.
   * This prevents users from being able to interact with the File, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Show list of attachments
   */
  readonly displayAttachments: boolean;
  /**
   * Name of the input.
   */
  readonly name: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   */
  readonly accept: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple
   */
  readonly multiple: boolean;
  /**
   * Maximum embedded file size
   */
  readonly maxFileSize: number;
  /**
   * Custom File identifier.
   */
  readonly identifier: string;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   */
  readonly invalid: boolean;
  /**
   * Error message when the maximum file size is exceeded
   */
  readonly errorSize: string;
  /**
   * Insert unsupported file error message
   */
  readonly errorAccept: string;
  /**
   * Description of the list of attachments
   */
  readonly attachmentsLabel: string;
  /**
   * Indicates the id of a component that describes the input.
   */
  readonly wcagDescribedBy: string;
  /**
   * Indicates the id of a component that labels the input.
   */
  readonly wcagLabelledBy: string;
  /**
   * Adds accessible label for the remove button that is only shown for screen readers.
   */
  readonly wcagRemoveLabel: string;
  /**
   * Adds accessible label for the list of attachments.
   */
  readonly wcagAttachmentsLabel: string;
  /**
   * Emitted when the File has focus.
   */
  govFocus: EventEmitter<GovFormFileEvent>;
  /**
   * Emitted when the File loses focus.
   */
  govBlur: EventEmitter<GovFormFileEvent>;
  /**
   * Called when the list of inserted files is changed
   */
  govFiles: EventEmitter<GovFormFileEvent>;
  /**
   * Called when a new file is added
   */
  govAddFile: EventEmitter<GovFormFileEvent>;
  /**
   * Called when a file is removed from the list
   */
  govRemoveFile: EventEmitter<GovFormFileEvent>;
  files: GovFormFileItem[];
  watchDisabled(): void;
  private passControlAttrs;
  private registerListeners;
  preventDefaults(e: any): void;
  handleDrop(e: DragEvent): void;
  private validateFiles;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  private onRemoveFileHandler;
  private onFocusHandler;
  private onBlurHandler;
  private onChangeHandler;
  /**
   * Returns the reference of the native element
   */
  getRef(): Promise<HTMLInputElement>;
  /**
   * Returns the reference of the native area element
   */
  getAreaRef(): Promise<HTMLDivElement>;
  /**
   * Remove all files from component state
   */
  reset(): Promise<void>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
