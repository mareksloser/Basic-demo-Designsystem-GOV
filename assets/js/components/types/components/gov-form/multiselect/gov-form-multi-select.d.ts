import { EventEmitter } from '../../../stencil-public-runtime';
import { FormMultiselectSizesType, FormMultiselectVariantType } from './constants';
import { FormMultiselectEvent, GovFormMultiSelectItem } from './gov-form-multi-select.types';
export declare class GovFormMultiSelect {
  private f;
  private readonly h;
  private selectRef?;
  private autocompleteRef?;
  private readonly selectId;
  private readonly listId;
  constructor();
  host: HTMLGovFormSelectElement;
  /**
   * Custom select identifier.
   */
  readonly identifier: string;
  /**
   * Custom select placeholder.
   */
  readonly placeholder: string;
  /**
   * Style variation of the form select.
   */
  readonly variant?: FormMultiselectVariantType;
  /**
   * Select’s size.
   */
  readonly size?: FormMultiselectSizesType;
  /**
   * Name of the select.
   */
  readonly name: string;
  /**
   * Option to hide the list of selected items
   */
  readonly hideSelectedList: boolean;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Makes the select component disabled.
   * This prevents users from being able to interact with the select, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   */
  readonly invalid: boolean;
  /**
   * Indicates the entered value of child form element does conform to the format expected by the application.
   */
  readonly success: boolean;
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
   * Indicates the id of a component that describes the input.
   */
  readonly wcagOwns: string;
  /**
   * Emitted when the select has focus.
   */
  govFocus: EventEmitter<FormMultiselectEvent>;
  /**
   * Emitted when the select loses focus.
   */
  govBlur: EventEmitter<FormMultiselectEvent>;
  /**
   * Emitted when the select change value.
   */
  govChange: EventEmitter<FormMultiselectEvent>;
  /**
   * Emitted when an item is selected
   */
  govSelect: EventEmitter<FormMultiselectEvent>;
  /**
   * Emitted when an item is removed
   */
  govRemove: EventEmitter<FormMultiselectEvent>;
  focused: boolean;
  value: string;
  selectedOptions: GovFormMultiSelectItem[];
  options: GovFormMultiSelectItem[];
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  watchDisabled(): void;
  private passControlAttrs;
  componentWillLoad(): void;
  private getAvailableOptions;
  private initAutocomplete;
  private getOptionIndex;
  private getOptionElement;
  private selectOption;
  private removeOption;
  componentDidLoad(): Promise<void>;
  render(): any;
  private onFocusHandler;
  private onBlurHandler;
  private onInputHandler;
  private onSelectHandler;
  private onTagRemove;
  /**
   * Returns the current state of the component
   */
  setFocus(options?: FocusOptions): Promise<void>;
  /**
   * Sets the ordered value of the element
   */
  setValue(value: string): Promise<void>;
  /**
   * Returns an instance of the native html select element
   */
  getRef(): Promise<HTMLSelectElement>;
  /**
   * Returns a list of selected items
   */
  getSelectedOptions(): Promise<GovFormMultiSelectItem[]>;
  /**
   * Setting a list of options to choose from
   */
  setOptions(options: GovFormMultiSelectItem[]): Promise<void>;
  /**
   * Returns all available options
   */
  getOptions(ignoreFilter?: boolean): Promise<GovFormMultiSelectItem[]>;
  /**
   * Setting the list of selected options
   */
  setSelectedOptions(options: GovFormMultiSelectItem[]): Promise<void>;
  /**
   * To remove an option from the selected list
   */
  removeSelectedOption(option: GovFormMultiSelectItem, notify?: boolean): Promise<void>;
  /**
   * Returns an instance of the native html select element
   */
  setSelectedOption(option: GovFormMultiSelectItem, notify?: boolean): Promise<void>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
