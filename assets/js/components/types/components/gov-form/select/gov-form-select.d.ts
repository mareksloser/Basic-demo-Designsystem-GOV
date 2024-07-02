import { EventEmitter } from '../../../stencil-public-runtime';
import { FormSelectSizesType, FormSelectVariantType } from './constants';
import { FormSelectEvent, FormSelectOption } from './gov-form-select.types';
export declare class GovFormSelect {
  private f;
  private readonly h;
  private selectRef?;
  private readonly selectId;
  constructor();
  host: HTMLGovFormSelectElement;
  /**
   * Value of select
   */
  value: string;
  /**
   * Custom select identifier.
   */
  readonly identifier: string;
  /**
   * Style variation of the form select.
   */
  readonly variant?: FormSelectVariantType;
  /**
   * Select’s size.
   */
  readonly size?: FormSelectSizesType;
  /**
   * Name of the select.
   */
  readonly name: string;
  /**
   * Set whether the input is required or not. Please note that this is necessary for accessible inputs when the user is required to fill them.
   * When using this property you need to also set “novalidate” attribute to your form element to prevent browser from displaying its own validation errors.
   */
  readonly required: boolean;
  /**
   * Indicates the entered value of child form element does conform to the format expected by the application.
   */
  readonly success: boolean;
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
   * Indicates the id of a related component’s visually focused element.
   */
  readonly wcagActiveDescendant: string;
  /**
   * Use this prop to add an aria-controls attribute. Use the attribute to indicate the id of a component controlled by this component.
   */
  readonly wcagControls: string;
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
  govFocus: EventEmitter<FormSelectEvent>;
  /**
   * Emitted when the select loses focus.
   */
  govBlur: EventEmitter<FormSelectEvent>;
  /**
   * Emitted when the select change value.
   */
  govChange: EventEmitter<FormSelectEvent>;
  focused: boolean;
  options: FormSelectOption[];
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  watchDisabled(): void;
  watchValue(): void;
  private passControlAttrs;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  private markSelectedValue;
  render(): any;
  private onFocusHandler;
  private onBlurHandler;
  private onChangeHandler;
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
   * Sets the selection options
   */
  setOptions(options: FormSelectOption[]): Promise<void>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
