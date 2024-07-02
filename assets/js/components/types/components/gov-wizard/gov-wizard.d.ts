import { EventEmitter } from "../../stencil-public-runtime";
import { WizardSizesType } from "./constants";
import { GovWizardItemChangeEvent } from "./gov-wizard-item.d";
export declare class GovWizard {
  private h;
  readonly host: HTMLGovWizardElement;
  constructor();
  /**
   * Size of wizard
   */
  readonly size?: WizardSizesType;
  /**
   * Adds accessible label for the wizard that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  readonly wcagLabelledBy: string;
  /**
   * Called when the wizard children state changes
   */
  govChange: EventEmitter<GovWizardItemChangeEvent>;
  private validateSize;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
