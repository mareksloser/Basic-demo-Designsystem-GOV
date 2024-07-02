import { EventEmitter } from "../../stencil-public-runtime";
import { WizardSizesType, WizardVariantsType } from "./constants";
import { WizardItemEvent } from "./gov-wizard-item.types";
export declare class GovWizardItem {
  private h;
  private readonly triggerId;
  private readonly contentId;
  constructor();
  readonly host: HTMLGovWizardItemElement;
  /**
   * Style variation of the button.
   */
  readonly variant?: WizardVariantsType;
  /**
   * Size of wizard
   */
  readonly size?: WizardSizesType;
  /**
   * Custom wizard item identifier. Otherwise, it will be generated
   */
  readonly identifier: string;
  /**
   * Defines weather the wizard item can be collapsible
   */
  readonly collapsible: boolean;
  /**
   * Item annotation of the wizard
   */
  readonly annotation: string;
  /**
   * Item label of the wizard
   */
  readonly label: string;
  /**
   * Makes the wizard component disabled.
   */
  readonly disabled: boolean;
  /**
   * Defines whether the accordion is open or closed by button
   */
  isExpanded: boolean;
  /**
   * Used to change the HTML tag in the accordion trigger for correct semantic structure
   */
  readonly labelTag: string;
  /**
   * Called when the accordion state changes
   */
  govChange: EventEmitter<WizardItemEvent>;
  private validateLabel;
  private validateTriggerTag;
  private validateVariant;
  private emmitChange;
  componentWillLoad(): void;
  render(): any;
  /**
   * Opening the Wizard
   */
  open(): Promise<void>;
  /**
   * Closing the Wizard
   */
  close(): Promise<void>;
  /**
   * Wizard switch
   */
  toggle(): Promise<void>;
  /**
   * Returns the current state of the component
   */
  currentState(): Promise<boolean>;
}
