import { EventEmitter } from "../../../stencil-public-runtime";
import { FormSwitchSizesType } from "./constants";
import { FormSwitchEvent } from "./gov-form-switch.types";
export declare class GovFormSwitch {
  private readonly h;
  private f;
  private inputRef?;
  private readonly checkboxId;
  constructor();
  host: HTMLGovFormSwitchElement;
  /**
   * Value of switch
   */
  readonly value: string;
  /**
   * When you can't use the form label.
   */
  readonly noLabel: boolean;
  /**
   * Switch button state
   */
  checked: boolean;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Makes the switch component disabled.
   * This prevents users from being able to interact with the switch, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Name of the switch.
   */
  readonly name: string;
  /**
   * Switch's size.
   */
  readonly size?: FormSwitchSizesType;
  /**
   * Custom switch identifier.
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
   * Emitted when the switch has focus.
   */
  govFocus: EventEmitter<FormSwitchEvent>;
  /**
   * Emitted when the switch loses focus.
   */
  govBlur: EventEmitter<FormSwitchEvent>;
  /**
   * Emitted when the switch change value.
   */
  govChange: EventEmitter<FormSwitchEvent>;
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
