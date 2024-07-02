import { EventEmitter } from "../../../stencil-public-runtime";
import { FormCheckboxSizesType } from "./constants";
import { FormCheckboxEvent } from "./gov-form-checkbox.types";
export declare class GovFormCheckbox {
  private readonly h;
  private f;
  private inputRef?;
  private readonly checkboxId;
  constructor();
  host: HTMLGovFormCheckboxElement;
  /**
   * Value of checkbox
   */
  readonly value: string;
  /**
   * Checkbox button state
   */
  checked: boolean;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Makes the checkbox component disabled.
   * This prevents users from being able to interact with the checkbox, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Name of the checkbox.
   */
  readonly name: string;
  /**
   * Checkboxes size.
   */
  readonly size?: FormCheckboxSizesType;
  /**
   * Custom checkbox identifier.
   */
  readonly identifier: string;
  /**
   * When you can't use the form label.
   */
  readonly noLabel: boolean;
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
   * Emitted when the checkbox has focus.
   */
  govFocus: EventEmitter<FormCheckboxEvent>;
  /**
   * Emitted when the checkbox loses focus.
   */
  govBlur: EventEmitter<FormCheckboxEvent>;
  /**
   * Emitted when the checkbox change value.
   */
  govChange: EventEmitter<FormCheckboxEvent>;
  validateSize(newValue: string): void;
  watchDisabled(): void;
  private passControlAttrs;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  private onFocusHandler;
  private onBlurHandler;
  private onClickHandler;
  private onChangeHandler;
  /**
   * Returns the reference of the native element
   */
  getRef(): Promise<HTMLInputElement>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
