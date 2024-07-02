import { EventEmitter } from "../../../stencil-public-runtime";
import { FormInputSizesType, FormInputVariantType, InputType, Type } from "./constants";
import { FormInputEvent } from "./gov-form-input.types";
import { Nullable } from "../../../types/interfaces";
export declare class GovFormInput {
  private f;
  private readonly h;
  private inputRef?;
  private readonly inputId;
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
  readonly variant?: FormInputVariantType;
  /**
   * Indicates the entered value of child form element does conform to the format expected by the application.
   */
  readonly success: boolean;
  /**
   * Input’s size.
   */
  readonly size?: FormInputSizesType;
  /**
   * Name of the input.
   */
  readonly name: string;
  /**
   * Generates a texarea for the possibility of multiple lines
   */
  readonly multiline: boolean;
  /**
   * Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows
   */
  readonly rows: number;
  /**
   * Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols
   */
  readonly cols: number;
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
   * Minimum length (number of characters) of value
   */
  readonly minlength: number;
  /**
   * Maximum length (number of characters) of value
   */
  readonly maxlength: number;
  /**
   * Minimum value that is acceptable and valid for the input containing the attribute
   */
  readonly min?: string | number;
  /**
   * Maximum value that is acceptable and valid for the input containing the attribute
   */
  readonly max?: string | number;
  /**
   * Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autocomplete
   */
  readonly autocomplete: boolean;
  /**
   * Same as original parameter https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autocorrect
   */
  readonly autocorrect: boolean;
  /**
   * Defineds the visual style of input
   */
  readonly type?: Type;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   */
  readonly inputType: InputType;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/input_role
   */
  readonly role: Nullable<string>;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   */
  readonly invalid: boolean;
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
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value.
   */
  readonly wcagAutocomplete: string;
  /**
   *  Attribute is set on an element to indicate if a control is expanded or collapsed
   */
  readonly wcagExpanded: boolean;
  /**
   * Emitted when the input has focus.
   */
  govFocus: EventEmitter<FormInputEvent>;
  /**
   * Emitted when the input loses focus.
   */
  govBlur: EventEmitter<FormInputEvent>;
  /**
   * Emitted when the input change value.
   */
  govInput: EventEmitter<FormInputEvent>;
  /**
   * Emitted when the input change value.
   */
  govKeyUp: EventEmitter<FormInputEvent>;
  /**
   * Emitted when the input change value.
   */
  govKeyDown: EventEmitter<FormInputEvent>;
  focused: boolean;
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  watchDisabled(): void;
  private passControlAttrs;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  private onFocusHandler;
  private onBlurHandler;
  private onKeyUpHandler;
  private onKeyDownHandler;
  private onInputHandler;
  /**
   * Returns the current state of the component
   */
  setFocus(options?: FocusOptions): Promise<void>;
  /**
   * Sets the ordered value of the element
   */
  setValue(value: string): Promise<void>;
  /**
   * Clears input value
   */
  clearValue(): Promise<void>;
  /**
   * Returns an instance of the native html input element
   */
  getRef(): Promise<HTMLInputElement>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
