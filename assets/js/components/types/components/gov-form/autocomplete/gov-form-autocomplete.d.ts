import { EventEmitter } from '../../../stencil-public-runtime';
import { SizesType, VariantType } from './constants';
import { FormAutocompleteEvent, GovFormAutocompleteItem } from './gov-form-autocomplete.types';
export declare class GovFormAutocomplete {
  private inputRef?;
  private listRef?;
  private readonly listBoxId;
  private searchCallback;
  private templateResolver;
  constructor();
  host: HTMLGovFormInputElement;
  /**
   * Value of input
   */
  value: string;
  /**
   * Custom input identifier.
   */
  readonly identifier: string;
  /**
   * Style variation of the form input.
   */
  readonly variant?: VariantType;
  /**
   * Indicates the entered value of child form element does conform to the format expected by the application.
   */
  readonly success: boolean;
  /**
   * Input’s size.
   */
  readonly size?: SizesType;
  /**
   * Main key name in the object
   */
  readonly nameKey: string;
  /**
   * Name of the input.
   */
  readonly name: string;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Makes the input component disabled.
   * This prevents users from being able to interact with the select, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Text that appears in the form control when it has no value set
   */
  readonly placeholder: string;
  /**
   * The value is not editable
   */
  readonly readonly: boolean;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   */
  readonly invalid: boolean;
  /**
   * Minimum length (number of characters) of value
   */
  readonly minlength: number;
  /**
   * Maximum length (number of characters) of value
   */
  readonly maxlength: number;
  /**
   * Custom message for when there is a blank sheet
   */
  readonly messageEmpty: string;
  /**
   * Custom message for when data is loaded
   */
  readonly messageLoading: string;
  /**
   * Indicates the id of a component that describes the input.
   */
  readonly wcagDescribedBy: string;
  /**
   * Indicates the id of a component that labels the input.
   */
  readonly wcagLabelledBy: string;
  /**
   * Same as original parameter
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-owns
   */
  readonly wcagOwns: string;
  /**
   * Emitted when the input has focus.
   */
  govFocus: EventEmitter<FormAutocompleteEvent>;
  /**
   * Emitted when the input loses focus.
   */
  govBlur: EventEmitter<FormAutocompleteEvent>;
  /**
   * Emitted when the input change value.
   */
  govInput: EventEmitter<FormAutocompleteEvent>;
  /**
   * Emitted when the input change value.
   */
  govSelect: EventEmitter<FormAutocompleteEvent>;
  focused: boolean;
  processing: boolean;
  arrowCounter: number;
  list: GovFormAutocompleteItem[];
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  private onArrowUp;
  private onArrowDown;
  private moveToView;
  private doSearch;
  get isValueAccepted(): boolean;
  componentWillLoad(): void;
  render(): any;
  private onFocusHandler;
  private onBlurHandler;
  private onInputHandler;
  private onSelectHandler;
  private onKeyUpHandler;
  private onKeyDownHandler;
  /**
   * Returns the current state of the component
   */
  setFocus(options?: FocusOptions): Promise<void>;
  /**
   * Set options for list
   */
  setOptions(options: GovFormAutocompleteItem[]): Promise<void>;
  /**
   * Clears whisperer value
   */
  clearValue(): Promise<void>;
  /**
   * Clears whisperer value
   */
  setProcessing(status: boolean): Promise<void>;
  /**
   * Set a custom asynchronous function for the whisperer
   */
  setSearchCallback(callback: (value: string) => Promise<any>): Promise<void>;
  /**
   * Setting a custom whisper result template
   * @param callback
   */
  setTemplateResolver(callback: (item: GovFormAutocompleteItem) => string): Promise<void>;
}
