import { EventEmitter } from "../../../stencil-public-runtime";
import { FormRadioSizesType } from "./constants";
import { FormRadioEvent } from "./gov-form-radio.types";
export declare class GovFormRadio {
  private readonly h;
  private f;
  private inputRef?;
  private readonly radioId;
  constructor();
  host: HTMLGovFormRadioElement;
  /**
   * Value of radio
   */
  readonly value: string;
  /**
   * When you can't use the form label.
   */
  readonly noLabel: boolean;
  /**
   * Radio button state
   */
  checked: boolean;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Makes the radio component disabled.
   * This prevents users from being able to interact with the radio, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Name of the radio.
   */
  readonly name: string;
  /**
   * Radio's size.
   */
  readonly size?: FormRadioSizesType;
  /**
   * Custom radio identifier.
   */
  readonly identifier: string;
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
   * Emitted when the radio has focus.
   */
  govFocus: EventEmitter<FormRadioEvent>;
  /**
   * Emitted when the radio loses focus.
   */
  govBlur: EventEmitter<FormRadioEvent>;
  /**
   * Emitted when the radio change value.
   */
  govChange: EventEmitter<FormRadioEvent>;
  validateSize(newValue: string): void;
  watchDisabled(): void;
  private passControlAttrs;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  private onClickHandler;
  private onFocusHandler;
  private onBlurHandler;
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
