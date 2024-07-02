import { FormControlSizesType } from "./constants";
export declare class GovFormControl {
  private readonly h;
  private f;
  private readonly controlId;
  private observer;
  constructor();
  host: HTMLGovFormControlElement;
  /**
   * Defines the space between nested components.
   */
  readonly gap?: FormControlSizesType;
  /**
   * Form element identifier
   */
  readonly identifier: string;
  /**
   * Indicates the entered value of child form element does not conform to the format expected by the application.
   */
  readonly invalid: boolean;
  /**
  /**
   * Indicates the form element is disabled
   */
  readonly disabled: boolean;
  /**
  /**
   * Indicates the entered value of child form element does conform to the format expected by the application.
   */
  readonly success: boolean;
  /**
   * Use control as a fieldset for better accessibility.
   * Note: Don't forget to set the legend attribute of the gov-form-label component
   */
  readonly fieldset: boolean;
  /**
   * Form element size.
   */
  readonly size?: FormControlSizesType;
  componentDidRender(): void;
  disconnectedCallback(): void;
  private passChildAttrs;
  private invalidChildAttrs;
  private formElementDescriptionControl;
  private syncControlMessages;
  render(): any;
}
