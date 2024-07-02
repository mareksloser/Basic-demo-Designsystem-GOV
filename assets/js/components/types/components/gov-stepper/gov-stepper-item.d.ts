import { EventEmitter } from '../../stencil-public-runtime';
import { StepperSizesType, StepperVariantType } from './constants';
import { GovStepperItemChangeEvent } from './gov-stepper-item.d';
export declare class GovStepperItem {
  private h;
  private readonly triggerId;
  private readonly contentId;
  constructor();
  readonly host: HTMLGovStepperItemElement;
  isExpandedState: boolean;
  /**
   * Style variation of the button.
   */
  readonly variant?: StepperVariantType;
  /**
   * Size of stepper
   */
  readonly size?: StepperSizesType;
  /**
   * Custom stepper item identifier. Otherwise, it will be generated
   */
  readonly identifier: string;
  /**
   * Item name of the stepper
   */
  readonly label: string;
  /**
   * Item annotation of the stepper
   */
  readonly annotation: string;
  /**
   * Used to change the HMTL tag in the stepper trigger for correct semantic structure
   */
  readonly triggerTag: string;
  /**
   * Called when the accordion state changes
   */
  govChange: EventEmitter<GovStepperItemChangeEvent>;
  validateLabel(newValue: string): void;
  validateTriggerTag(newValue: string): void;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
  /**
   * Returns the current state of the component
   */
  currentState(): Promise<boolean>;
}
